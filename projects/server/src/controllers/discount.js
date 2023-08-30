const { Op } = require("sequelize")
const db = require("../models")
const mailer = require("../lib/mailer");
const dotenv = require("dotenv");
dotenv.config();
const url_foto_diskon = process.env.photo_discount_url

const discountController = {

    getAllDt : async (req,res) => {
      const {branch_id, search, sort, ordering, page} = req.body
      let order = []
      if(sort === "valid_start"){
        order = [[sort, ordering]]
      } else if(sort === "valid_to" ){
        order = [[sort, ordering]]
      } else if(sort === "nominal"){
        order = [[sort, ordering]]
      }

      let where = {}
      if(branch_id){
        where.branch_id = branch_id
      }

      if(search){
        where[Op.or] = [
          { "$title$": { [Op.like]: `%${search}%` } },
          { "$valid_start$": { [Op.like]: `%${search}%` } },
          { "$valid_to$": { [Op.like]: `%${search}%` } },
          { "$nominal$": { [Op.like]: `%${search}%` } },
        ];
      
      }
      console.log(order, "ini order");
      try {
       const dtStockDiscount =  await db.Discount.findAndCountAll({
          where : where,
          order : order,
          limit : 3,
          offset : 3 * page
        })
        res.status(200).send({
          message : "data stock include diskon",
          Data : dtStockDiscount.rows,
          total : Math.ceil(dtStockDiscount.count / 3),
          jumlah_discount : dtStockDiscount.count
        })
      } catch (error) {
        res.status(500).send({message : error.message})
      }
    },

    getAll : async (req,res) => {
      try {
        const discounts = await db.Discount.findAll();
        if (!discounts || discounts.length === 0) {
          return res.status(404).send({ message: "No discount data found." });
        }
        res.status(200).send({ message: "Discount data", data: discounts });
      } catch (err) {
        console.error("Error while fetching discount data:", err);
        res.status(500).send({ message: "Failed to fetch discount data." });
      }
    },

    getAllSelected : async (req,res) => {
      const {title, valid_start, valid_to, nominal, product_id, branch_id, discount_id} = req.body
      console.log(req.body, "ini body seleteddddddddddzzzzzzzzzzzzzzzzzzzzz");
      try {
        const dtStockBydiscountId = await db.Stock.findAll({
          where : {
            branch_id : branch_id,
            discount_id : discount_id
          }
        })
        res.status(200).send({message : "data prduct terselect", Data : dtStockBydiscountId})
      } catch (error) {
        res.status(500).send({message : error.message})
      }
    } ,

    addDiscount : async (req,res) => {
      const {title, valid_start, valid_to, nominal, product_id, branch_id, discount_id} = req.body
      console.log(req.body);
      try {
       const newDiscount = await db.Discount.create({
          title, valid_start, valid_to, nominal, branch_id
        })

        const editStock = await db.Stock.update({
          discount_id : newDiscount.id,
          branch_id : branch_id
        }, 
        {
          where : {
            product_id : {
              [db.Sequelize.Op.in] : product_id
            },
            branch_id : branch_id
          }
        })
        res.status(200).send({message : "Data Discount berhasil ditambahkan", data : newDiscount } )
        
      } catch (error) {
        res.status(500).send({message : error.message})
      }

    },

    uploadFotoDiscount: async (req, res) => {
      try {
        const { filename } = req.file;
        console.log(url_foto_diskon, "ini url nya diskon");
        console.log(req.file, "ini req.file nya diskon"); 
        console.log(req.params, "ini req.params nya loh");
        await db.Discount.update(
          {
            photo_discount_url : url_foto_diskon + filename,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then((result) => res.status(200).send({message : "uoload foto berhasil"}));
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
    },

    updateDiscount : async(req,res) => {
      const {title, valid_start, valid_to, nominal, product_id, discount_id} = req.body
      console.log(req.body, "ini bodynya");
      try {
        await db.Discount.update(
        {
          nominal
        },
        {where : 
          { id : discount_id }
        })
        await db.Stock.update({discount_id : null}, {where : {discount_id : discount_id }})
        await db.Stock.update({ discount_id : discount_id}, 
        { where : { 
          product_id : {[db.Sequelize.Op.in] : product_id }
        }})

        res.status(200).send({message : "Data diskon berhasil diubah"})
      } catch (error) {
        res.status(500).send({message : error.message})
      }
      
    },

    deleteDiscount : async(req,res) => {
      try {
        const {discount_id} = req.body
        console.log(req.body, "ini diskon id nya");
        await db.Discount.destroy({
          where : {
            id : discount_id
          }
        })
  
        await db.Stock.update ({
          discount_id : null
        },
        {
          where : {
            discount_id : discount_id
          }
        })
        res.status(200).send({message : "data discount berhasil dihapus"})
      } catch (error) {
        res.status(500).send({message : error.message})
      }

    },
    getDiscountB: async (req, res) => {
      try {
        const discount = await db.Discount.findAll();
        return res.send(discount);
      } catch (err) {
        console.log(err.message);
        res.status(500).send({
          message: err.message,
        });
      }
    },
};

module.exports = discountController;
