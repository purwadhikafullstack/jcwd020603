const { Op } = require("sequelize");
const db = require("../models");
const moment = require("moment");

const salesReportUserController = {
  getUserBySUMTALL: async (req, res) => {
    const { dateFrom, dateTo, branch_id, sort, ordering, search } = req.body;

    let order = [];
    if (sort === "product_name") {
      order = [
        [
          { model: db.Stock, as: "Stock" },
          { model: db.Product, as: "Product" },
          "product_name",
          ordering,
        ],
      ];
    } else if (sort === "price") {
      order = [
        [
          { model: db.Stock, as: "Stock" },
          { model: db.Product, as: "Product" },
          "price",
          ordering,
        ],
      ];
    } else if (sort === "total_qty") {
      order = [[sort, ordering]];
    }

    let where = {
      "$Order.status$": {
        [Op.in]: ["Dikirim", "Pesanan Dikonfirmasi"],
      },
      "$Order.createdAt$": { [Op.between]: [dateFrom, dateTo] },
    };
    if (branch_id) {
      where["$Order.Branch.id$"] = branch_id;
    }
    if (search) {
      where[Op.or] = [{ "$Order.createdAt$": { [Op.like]: `%${search}%` } }];
    }

    console.log(where, "ini where nya user");
    console.log(order, "ini order nya user");
    try {
      const userTransactionDetails = await db.OrderDetail.findAll({
        attributes: [
          [
            db.Sequelize.fn("COUNT", db.Sequelize.col("Order.id")),
            "transaction_count",
          ],
        ],
        include: [
          {
            model: db.Order,
            as: "Order",
            // where: {
            //   status: {
            //     [Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]
            //   },
            //   createdAt: { [Op.between]: [dateFrom, dateTo] }
            // },
            include: [
              {
                model: db.Branch,
                as: "Branch",
              },
              {
                model: db.User,
                as: "User",
              },
              {
                model: db.Address,
                as: "Address",
              },
            ],
          },
          {
            model: db.Stock,
            as: "Stock",
            include: [
              {
                model: db.Product,
                as: "Product",
              },
            ],
          },
        ],
        group: ["Order.createdAt", "Order.User.id"], // Mengelompokkan berdasarkan tanggal dan pengguna
        where: where,
        order: order,
      });

      const userDataByDate = {};

      userTransactionDetails.forEach((result) => {
        const dateTrans = result.Order.createdAt.toISOString().split("T")[0];
        const userId = result.Order.user_id;
        const userName = result.Order.User.user_name;
        const branch = result.Order.Branch.branch_name;

        if (!userDataByDate[dateTrans]) {
          userDataByDate[dateTrans] = {
            total_transaksi: 0,
            date: dateTrans,
            dataUser: [],
          };
        }

        if (
          !userDataByDate[dateTrans].dataUser.some(
            (user) => user.user_id === userId
          )
        ) {
          userDataByDate[dateTrans].dataUser.push({
            user_id: userId,
            user_name: userName,
            jumlah_transaksi: 0,
            branch_name: branch,
          });
        }

        userDataByDate[dateTrans].total_transaksi++;
        const userIndex = userDataByDate[dateTrans].dataUser.findIndex(
          (user) => user.user_id === userId
        );
        userDataByDate[dateTrans].dataUser[userIndex].jumlah_transaksi++;
      });

      const formattedOutput = Object.values(userDataByDate);

      console.log(
        formattedOutput,
        "ini data user berdasarkan tanggal transaksinya"
      );

      res.status(200).send({
        message: "User Transaction Summary",
        allData: userTransactionDetails,
        dataTransByDate: formattedOutput,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getUserBySUMTALLPagination: async (req, res) => {
    const { dateFrom, dateTo, branch_id, sort, ordering, page, search } =
      req.body;

    let order = [];
    if (sort === "createdAt") {
      order = [[{ model: db.Order, as: "Order" }, "createdAt", ordering]];
    }

    let where = {
      "$Order.status$": { [Op.in]: ["Dikirim", "Pesanan Dikonfirmasi"] },
      "$Order.createdAt$": { [Op.between]: [dateFrom, dateTo] },
    };
    if (branch_id) {
      where["$Order.Branch.id$"] = branch_id;
    }
    if (search) {
      where[Op.or] = [{ "$Order.createdAt$": { [Op.like]: `%${search}%` } }];
    }

    console.log(where, "ini where nya user");
    console.log(order, "ini order nya user");
    try {
      const userTransactionDetails = await db.OrderDetail.findAndCountAll({
        attributes: [
          [
            db.Sequelize.fn("COUNT", db.Sequelize.col("Order.id")),
            "transaction_count",
          ],
        ],
        include: [
          {
            model: db.Order,
            as: "Order",
            include: [
              {
                model: db.Branch,
                as: "Branch",
              },
              {
                model: db.User,
                as: "User",
              },
              {
                model: db.Address,
                as: "Address",
              },
            ],
          },
          {
            model: db.Stock,
            as: "Stock",
            include: [
              {
                model: db.Product,
                as: "Product",
              },
            ],
          },
        ],
        group: ["Order.createdAt", "Order.User.id"], // Mengelompokkan berdasarkan tanggal dan pengguna
        where: where,
        order: order,
        limit: 3,
        offset: 3 * page,
      });

      const allDataForPagination = await db.OrderDetail.findAll({
        attributes: [
          [
            db.Sequelize.fn("COUNT", db.Sequelize.col("Order.id")),
            "transaction_count",
          ],
        ],
        include: [
          {
            model: db.Order,
            as: "Order",
            include: [
              {
                model: db.Branch,
                as: "Branch",
              },
              {
                model: db.User,
                as: "User",
              },
              {
                model: db.Address,
                as: "Address",
              },
            ],
          },
          {
            model: db.Stock,
            as: "Stock",
            include: [
              {
                model: db.Product,
                as: "Product",
              },
            ],
          },
        ],
        group: ["Order.createdAt", "Order.User.id"], // Mengelompokkan berdasarkan tanggal dan pengguna
        where: where,
        order: order,
      });

      const userDataByDate = {};
      console.log(allDataForPagination, "mstsssssssssssssssssssssssss");
      allDataForPagination.forEach((result) => {
        const dateTrans = result.Order.createdAt.toISOString().split("T")[0];
        const userId = result.Order.user_id;
        const userName = result.Order.User.user_name;
        const branch = result.Order.Branch.branch_name;

        if (!userDataByDate[dateTrans]) {
          userDataByDate[dateTrans] = {
            total_transaksi: 0,
            date: dateTrans,
            dataUser: [],
          };
        }

        if (
          !userDataByDate[dateTrans].dataUser.some(
            (user) => user.user_id === userId
          )
        ) {
          userDataByDate[dateTrans].dataUser.push({
            user_id: userId,
            user_name: userName,
            jumlah_transaksi: 0,
            branch_name: branch,
          });
        }

        userDataByDate[dateTrans].total_transaksi++;
        const userIndex = userDataByDate[dateTrans].dataUser.findIndex(
          (user) => user.user_id === userId
        );
        userDataByDate[dateTrans].dataUser[userIndex].jumlah_transaksi++;
      });

      const formattedOutput = Object.values(userDataByDate);

      const itemsPerPage = 3;
      const currentPage = page || 0; // Jika page tidak diberikan, gunakan halaman pertama

      // Dapatkan tiga data yang sesuai dengan halaman saat ini
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const dataToShow = formattedOutput.slice(startIndex, endIndex);

      console.log(
        formattedOutput,
        "ini data user berdasarkan tanggal transaksinya cuuy"
      );
      console.log(formattedOutput.length, "ini leng usertransaksihhhhhhhh");
      console.log(userDataByDate, "user by datezzzzzzzzzzz");
      res.status(200).send({
        message: "User Transaction Summary",
        allData: userTransactionDetails.rows,
        dataTransByDate: dataToShow,
        total: Math.ceil(formattedOutput.length / itemsPerPage),
        allDataForPagination: allDataForPagination,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  //   getUserBySUMTALLPagination : async (req,res) => {
  //     const { dateFrom, dateTo, branch_id, sort, ordering, page, search } = req.body;
  //     console.log(req.body, "body user pagination");
  //     let order = [];
  //     if (sort === "product_name") {
  //       order = [[{ model: db.Stock, as: "Stock" }, { model: db.Product, as: "Product" }, "product_name", ordering]];
  //     } else if (sort === "price") {
  //       order = [[{ model: db.Stock, as: "Stock" }, { model: db.Product, as: "Product" }, "price", ordering]];
  //     } else if (sort === "total_qty") {
  //       order = [[sort, ordering]];
  //     }

  //     let where = {
  //       "$Order.status$": { [Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"] },
  //       "$Order.createdAt$": { [Op.between]: [dateFrom, dateTo] }
  //     };
  //     if (branch_id) {
  //       where["$Order.Branch.id$"] = branch_id;
  //     }
  //     if (search) {
  //       where[Op.or] = [{ "$Stock.Product.product_name$": { [Op.like]: `%${search}%` } }];
  //     }

  //     try {
  //       const userTransactionDetailsPagination = await db.OrderDetail.findAndCountAll({
  //         attributes: [
  //           [db.Sequelize.fn('COUNT', db.Sequelize.col('Order.id')), 'transaction_count'],
  //         ],
  //         include: [
  //           {
  //             model: db.Order,
  //             as: "Order",
  //             include: [
  //               {
  //                 model: db.Branch,
  //                 as: "Branch"
  //               },
  //               {
  //                 model: db.User,
  //                 as: "User"
  //               },
  //               {
  //                 model: db.Address,
  //                 as: "Address"
  //               }
  //             ]
  //           },
  //           {
  //             model: db.Stock,
  //             as: "Stock",
  //             include: [
  //               {
  //                 model: db.Product,
  //                 as: "Product"
  //               }
  //             ]
  //           }
  //         ],
  //         where : where,
  //         group: ['Order.createdAt', 'Order.User.id'], // Mengelompokkan berdasarkan tanggal dan pengguna
  //         order: order,
  //         limit : 3,
  //         offset : 3 * page
  //       });

  //       const userDataByDate = {};
  //       console.log(userTransactionDetailsPagination, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
  //   userTransactionDetailsPagination.rows.forEach((result) => {
  //     const dateTrans = result.Order.createdAt.toISOString().split('T')[0];
  //     const userId = result.Order.User.id;
  //     const userName = result.Order.User.user_name;
  //     const branch = result.Order.Branch.branch_name;

  //     if (!userDataByDate[dateTrans]) {
  //       userDataByDate[dateTrans] = {
  //         "total_transaksi": 0,
  //         "date": dateTrans,
  //         "dataUser": []
  //       };
  //     }

  //     if (!userDataByDate[dateTrans].dataUser.some(user => user.user_id === userId)) {
  //       userDataByDate[dateTrans].dataUser.push({
  //         user_id: userId,
  //         user_name: userName,
  //         jumlah_transaksi: 0,
  //         branch_name : branch
  //       });
  //     }

  //     userDataByDate[dateTrans].total_transaksi++;
  //     const userIndex = userDataByDate[dateTrans].dataUser.findIndex(user => user.user_id === userId);
  //     userDataByDate[dateTrans].dataUser[userIndex].jumlah_transaksi++;
  //   });

  //   const formattedOutput = Object.values(userDataByDate);

  //   console.log(formattedOutput, "ini data user berdasarkan tanggal transaksinxxxxxxxxxxxxxxxxxxxxxx");
  //   console.log(userTransactionDetailsPagination.rows, "ini data user iniiiiiiiiii");
  //   console.log(userTransactionDetailsPagination.rows.length, "ini leng nyaaaaaaaaaaaaaaaaaaaaaaaa");

  //   res.status(200).send({
  //     message: "User Transaction Summary",
  //     allData : userTransactionDetailsPagination.rows,
  //     dataTransByDate: formattedOutput,
  //     total : Math.ceil(userTransactionDetailsPagination.count / 3)
  //   });
  // } catch (error) {
  //   res.status(500).send({ message: error.message });
  // }
  //   },

  //   getProductBySUMqtyForPagination : async(req,res) => {
  //     const {dateFrom, dateTo, branch_id, sort, ordering, page, search} = req.body
  //     console.log(req.body, "ini body nya pagination");
  //     let order = []
  //     if(sort === "product_name"){
  //       order =   [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "product_name", ordering]]
  //     } else if(sort === "price"){
  //       order =  [[{ model: db.Stock, as: "Stock" },{model: db.Product, as: "Product"}, "price", ordering]]
  //     } else if (sort === "total_qty") {
  //       order = [[sort, ordering]]
  //     }

  //     let where = {
  //         "$Order.status$" : {[Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]},
  //         "$Order.createdAt$" : {[Op.between] : [dateFrom, dateTo ]}
  //     }
  //     if (branch_id) {
  //         where["$Order.Branch.id$"] = branch_id;
  //       }
  //     if(search) {
  //         where[Op.or] = [
  //         { "$Stock.Product.product_name$" : { [Op.like]: `%${search}%` } }
  //         ];
  //     }

  //     console.log(where, "ini where nya product pagination");
  //     console.log(order, "ini order nya product pagination");
  //   try {
  //     const sumQtyProductPagination = await db.OrderDetail.findAndCountAll({
  //         attributes: ['stock_id', [db.Sequelize.fn('SUM', db.Sequelize.col('quantity')), 'total_qty']],
  //         group: ['stock_id'],
  //         include : [
  //             {
  //                 model : db.Order,
  //                 as : "Order",
  //                 where: {
  //                     status: {
  //                       [Op.in]: ["diproses", "dikirim", "pesanan dikonfirmasi"]
  //                     }
  //                 },
  //                 include : [
  //                     {
  //                         model : db.Branch,
  //                         as : "Branch"
  //                     },
  //                     {
  //                         model : db.User,
  //                         as : "User"
  //                     },
  //                     {
  //                         model : db.Address,
  //                         as : "Address"
  //                     }
  //                 ]
  //             },
  //             {
  //                 model : db.Stock,
  //                 as : "Stock",
  //                 include : [
  //                     {
  //                         model : db.Product,
  //                         as : "Product"
  //                     }
  //                 ]
  //             }
  //         ],
  //         where : where,
  //         order : order,
  //         limit : 3,
  //         offset : 3*page
  //       })
  //       console.log(sumQtyProductPagination, "ini result nya yang pagination");
  //     res.status(200).send({
  //         message : "Summary qty each product",
  //         data : sumQtyProductPagination.rows,
  //         total : Math.ceil(sumQtyProductPagination.count.length / 3)

  //     })
  //   } catch (error) {
  //     res.status(500).send({message : error.message})
  //   }
  // }
};

module.exports = salesReportUserController;
