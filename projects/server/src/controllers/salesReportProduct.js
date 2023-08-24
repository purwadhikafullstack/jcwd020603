const { Op } = require("sequelize")
const db = require("../models")
const moment = require("moment");


const salesReportProductController = {

    getAllProduct : async(req,res) => {
        try {
          const allProduct = await db.Product.findAll()
          const ctgory = await db.Category.findAll()
          res.status(200).send({message : "Data Product Dari Semua Branch", Data : allProduct, Category : ctgory})
        } catch (error) {
          res.status(500).send({message : error.message})
        }
    },

    getStockBranch : async (req,res) => {
      const {branch_id} = req.body
      let where = {}
      if (branch_id) {
        where.branch_id = branch_id
      }
        try {
          const stocBranch = await db.Stock.findAll({
            where : where
          })
          res.status(200).send({message : "Data Stock Barang di Branch", Data : stocBranch})
        } catch (error) {
          res.status(500).send({message : error.message})
        }
    },

    getDtBranch : async(req,res) => {
        try {
            dtBranch = await db.Branch.findAll()
            res.status(200).send({message : "data branch", data : dtBranch})
        } catch (error) {
            res.status(500).send({message : error.message})
        }
    },

    getProductBySUMqty : async(req,res) => {
        const {dateFrom, dateTo, branch_id, sort, ordering, search} = req.body
        console.log(req.body, "ini body nya");
        let order = []
        if(sort === "product_name"){
          order =   [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "product_name", ordering]]
        } else if(sort === "price"){
          order =  [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "price", ordering]]
        } else if (sort === "total_qty") {
          order = [[sort, ordering]]
        }

        let where = {
            "$Order.status$" : {[Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]},
            "$Order.createdAt$" : {[Op.between] : [dateFrom, dateTo ]}
        }
        if (branch_id) {
            where["$Order.Branch.id$"] = branch_id;
          }
        if(search) {
            where[Op.or] = [
            { "$Stock.Product.product_name$" : { [Op.like]: `%${search}%` } }
            ];
        }

        console.log(where, "ini where nya product");
        console.log(order, "ini order nya product");
      try {
        const sumQtyProduct = await db.OrderDetail.findAll({
            attributes: ['stock_id', [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'total_qty']],
            group: ['stock_id'],
            include : [
                {
                    model : db.Order,
                    as : "Order",
                    where: {
                        status: {
                          [Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]
                        }
                    },
                    include : [
                        {
                            model : db.Branch,
                            as : "Branch"
                        },
                        {
                            model : db.User,
                            as : "User"
                        },
                        {
                            model : db.Address,
                            as : "Address"
                        }
                    ]
                },
                {
                    model : db.Stock,
                    as : "Stock",
                    include : [
                        {
                            model : db.Product,
                            as : "Product"
                        }
                    ]
                }
            ],
            where : where,
            order : order,
          })
          sumQtyProduct.forEach(result => {
            console.log(`stock_id ${result.stock_id} qty = ${result.total_qty}`);
          });
          console.log(sumQtyProduct, "ini result nya");
        res.status(200).send({message : "Summary qty each product", data : sumQtyProduct})
      } catch (error) {
        res.status(500).send({message : error.message})
      } 
    },

    getProductBySUMqtyForPagination : async(req,res) => {
        const {dateFrom, dateTo, branch_id, sort, ordering, page, search} = req.body
        console.log(req.body, "ini body nya pagination");
        let order = []
        if(sort === "product_name"){
          order =   [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "product_name", ordering]]
        } else if(sort === "price"){
          order =  [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "price", ordering]]
        } else if (sort === "total_qty") {
          order = [[sort, ordering]]
        }

        let where = {
            "$Order.status$" : {[Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]},
            "$Order.createdAt$" : {[Op.between] : [dateFrom, dateTo ]}
        }
        if (branch_id) {
            where["$Order.Branch.id$"] = branch_id;
          }
        if(search) {
            where[Op.or] = [
            { "$Stock.Product.product_name$" : { [Op.like]: `%${search}%` } }
            ];
        }

        console.log(where, "ini where nya product pagination");
        console.log(order, "ini order nya product pagination");
      try {
        const sumQtyProductPagination = await db.OrderDetail.findAndCountAll({
            attributes: ['stock_id', [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'total_qty']],
            group: ['stock_id'],
            include : [
                {
                    model : db.Order,
                    as : "Order",
                    where: {
                        status: {
                          [Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]
                        }
                    },
                    include : [
                        {
                            model : db.Branch,
                            as : "Branch"
                        },
                        {
                            model : db.User,
                            as : "User"
                        },
                        {
                            model : db.Address,
                            as : "Address"
                        }
                    ]
                },
                {
                    model : db.Stock,
                    as : "Stock",
                    include : [
                        {
                            model : db.Product,
                            as : "Product"
                        }
                    ]
                }
            ],
            where : where,
            order : order,
            limit : 3,
            offset : 3*page
          }) 
          console.log(sumQtyProductPagination, "ini result nya yang pagination");
        res.status(200).send({
            message : "Summary qty each product",
            data : sumQtyProductPagination.rows,
            total : Math.ceil(sumQtyProductPagination.count.length / 3)

        })
      } catch (error) {
        res.status(500).send({message : error.message})
      } 
    }
}

module.exports = salesReportProductController