import Jwt from 'jsonwebtoken'
import users from "../model/user_model/user.js"

const Authentication = async(req,res,next) =>{
    try {
        if(!req.headers.authorization){
            res.json("authentication token required")
        }else{
            const authHader = req.headers.authorization
            const token = authHader.split(' ')[1]
            const verif = await Jwt.verify(token,process.env.SCRET_KEY)
            req.verifytoken = token
            const admindata = await users.findOne({ _id: verif._id })
            if(admindata){
                req.admin = admindata
                req.token = token
                next()
            }else{
                res.json({
                    status:false,
                    response_code:401,
                    response_message:"route not match"
                  })
            }
        }
    } catch (error) {
        console.log(error)
        res.json({
            status:false,
            response_code:401,
            response_message:"route not match"
          })
    }
}

export default Authentication