const { Op } = require("sequelize")
const db = require("../models")


const salesReportController = {
    getAll : async (req,res) => {
        const{dateFrom, dateTo, branch_id} = req.body
        console.log(req.params, "ini params nya");
        console.log(req.body, "ini body nya");

        if(branch_id == ""){

            try {
                const dtTrans = await db.Order.findAll({
                     where : {
                         status : {[Op.or] : ["Diproses", "Dikirim", "Pesanan Dikonfirmasi" ]},
                         date : {[Op.between] : [dateFrom, dateTo ]},
                     },
                     include: [
                     {
                         model : db.Branch,
                         as : "Branch",
                         attributes : [
                             "branch_name",
                             "branch_address",
                             "district",
                             "city_id",
                             "province",
                         ],
                         include : [
                             {
                               model: db.City,
                               as : "City",
                               attributes : [
                                 "city_name",
                                 "type",
                                 "postal_code"
                               ]
                             }
                           ]
                     },
                     {
                         model : db.Address,
                         as : "Address",
                         attributes : [
                             "address",
                             "district",
                             "Province",
                             "user_id",
                             "city_id"
                         ]
                     },
                     {
                         model : db.User,
                         as : "User",
                         attributes : [
                             "user_name",
                             "branch_id"
                         ]
                     }
                     ]
                     
                 })
                 res.status(200).send({message : "data trans", data : dtTrans})
             } catch (error) {
                 res.status(500).send({message : error.message})
             }

        }else {

            try {
                const dtTrans = await db.Order.findAll({
                     where : {
                         branch_id : branch_id,
                         status : {[Op.or] : ["Diproses", "Dikirim", "Pesanan Dikonfirmasi" ]},
                         date : {[Op.between] : [dateFrom, dateTo ]},
                     },
                     include: [
                     {
                         model : db.Branch,
                         as : "Branch",
                         attributes : [
                             "branch_name",
                             "branch_address",
                             "district",
                             "city_id",
                             "province",
                         ],
                         include : [
                             {
                               model: db.City,
                               as : "City",
                               attributes : [
                                 "city_name",
                                 "type",
                                 "postal_code"
                               ]
                             }
                           ]
                     },
                     {
                         model : db.Address,
                         as : "Address",
                         attributes : [
                             "address",
                             "district",
                             "Province",
                             "user_id",
                             "city_id"
                         ]
                     },
                     {
                         model : db.User,
                         as : "User",
                         attributes : [
                             "user_name",
                             "branch_id"
                         ]
                     }
                     ]
                     
                 })
                 res.status(200).send({message : "data trans", data : dtTrans})
             } catch (error) {
                 res.status(500).send({message : error.message})
             }
        }

       
    },

    allDataOrder :  async (req,res) => {
        try {
            const dtTransByDate = await db.Order.findAll({
                where : {
                   
                        status : {[Op.or] : ["Diproses", "Dikirim", "Pesanan Dikonfirmasi" ]},
                    
                },
                include: [
                {
                    model : db.Branch,
                    as : "Branch",
                    attributes : [
                        "branch_name",
                        "branch_address",
                        "district",
                        "city_id",
                        "province",
                    ],
                    include : [
                        {
                          model: db.City,
                          as : "City",
                          attributes : [
                            "city_name",
                            "type",
                            "postal_code"
                          ]
                        }
                      ]
                },
                {
                    model : db.Address,
                    as : "Address",
                    attributes : [
                        "address",
                        "district",
                        "Province",
                        "user_id",
                        "city_id"
                    ]
                },
                {
                    model : db.User,
                    as : "User",
                    attributes : [
                        "user_name",
                        "branch_id"
                    ]
                }
                ]
                
            })
            res.status(200).send({message : "data trans", data : dtTransByDate})
        } catch (error) {
            res.status(500).send({message : error.message})
        }
    },

}

module.exports = salesReportController