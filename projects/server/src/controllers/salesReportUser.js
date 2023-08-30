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
};

module.exports = salesReportUserController;
