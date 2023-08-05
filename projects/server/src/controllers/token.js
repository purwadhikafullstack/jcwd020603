const db = require("../models")


const tokenController = {

    getTken : async(req,res) => {
        await db.Token.findOne({
            where : {
                token : token,
                status : "FORGOT-PASSWORD"
            }
        }).then((res) => res.send({message : "ini", data : res.dataValues}))
    },
  
    updateToken : async (req,res) => {
            const {token} = req.body
        try {
            await db.Token.update({
                valid : false
            },
            {
                where : {
                    token : token,
                    status : "FORGOT-PASSWORD"
                }
            }).then((res) => {
                res.status(200).send({ message : "Token berhasil di update"})
            })
        
        } catch (error) {
            res.status(500).send({message : error.message})
        }
       
    }
}


module.exports = tokenController