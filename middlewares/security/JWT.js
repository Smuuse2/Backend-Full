import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
//generate Token



export const generateToken = (user) =>{

    const payload = {
        id : user.id,
        email : user.email,
        userName : user.userName,
        isAdmin : user.isAdmin
    }

    return jwt.sign(payload, process.env.JWT_Secret_Key,{
        expiresIn : "1m"
    } )

}


//decode Token 

export const decodeToken = async(req,res,next)=>{
    try {
        
        // cali " " ca li [0]

        const token = req.headers.authorization?.startsWith("Bearer") && req.headers.authorization?.split(" ")[1]

        if(!token){
            return res.status(405).json({
                message: "you are not login!",
                isSuccess:false
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_Secret_Key)

        const user = await prisma.user.findFirst({
            where:{
                id: decoded.id
            }
        })

        if(!user){
            return res.status(405).json({
                message: "unAuthorized!",
                isSuccess:false
            })
        }

        req.user = user
        next()

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "unAuthorized!",
            isSuccess : false
           })
        
    }
}