const db = require('../models')


const voucerController = {

    getAll : async (req,res) => {
    try {
        const fetchVoucer =  await db.Voucher.findAll()
        res.status(200).send({message : "Ini data voucher", data : fetchVoucer})  
    } catch (error) {
        res.status(500).send({message : error.message})
    }   
    },

    addVoucher : async(req,res) => {
    try {
        const {title,voucher_code,valid_start,valid_to,nominal,minimal_order,limit,desc} =req.body
        const tambahVoucher = await db.Voucher.create({
        title,voucher_code,valid_start,valid_to,nominal,minimal_order,limit,desc})
        res.status(200).send({message : "Data voucher berhasil ditambahkan", data : tambahVoucher})
    } catch (error) {
        res.status(500).send({message : error.message})
        } 
    },

    updateVoucher : async (req,res) => {
    try {
        const {id, title,voucher_code,valid_start,valid_to,nominal,minimal_order,limit,desc} =req.body
        const editVoucher = await db.Voucher.update({
        nominal,minimal_order,limit,desc
        },
        {
            where : {
                id : id
            }
        })
        res.status(200).send({message : "Data voucher berhasil diubah", data : editVoucher})
    } catch (error) {
        res.status(500).send({message : error.message})
    }
    },

    deleteVoucher : async(req,res) => {
    try {
        const{id} = req.body
        const hapusVoucher = await db.Voucher.destroy({
            where : {
                id : id
            }
        })
        res.status(200).send({message : "Data Voucher berhasil di hapus"})
    } catch (error) {
        res.status(500).send({message : error.message})
    }
    }
}
module.exports = voucerController