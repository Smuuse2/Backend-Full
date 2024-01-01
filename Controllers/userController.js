import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrytp from 'bcryptjs'
import { generateToken } from "../middlewares/security/JWT.js";



//create user

export  const  createUser = async(req,res)=>{
    try {
        
        // data

        const {name,password,email} = req.body

        if(!name || !password ||!email){
            return res.status(404).json({
                message:" fill your data ",
                isSuccess:false
            })
        }

        //checking email is axist

        const checkEmail = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(checkEmail){
            return res.status(404).json({
                message:" email is already used or axist ",
                isSuccess:false
            })
        }

        //create new user

        //create  = data only
        //update = data and where
        //find  =  where and emty

        //bcrptjs = password hashing = admin = kndskncksahdifuhsoucodsnu

        const hashPass = bcrytp.hashSync(password)

        const newUser = await prisma.user.create({
            data:{
                userName:name,
                email,
                password :hashPass,
                isAdmin : email === "odeysomaliyed@gmail.com"
            }
        })
        res.json({
            result:{...newUser},
            isSuccess:true
        })

        
    } catch (error) {
        error
    }
}

//login

export const login = async(req,res)=>{
    try {
        
        const {email,password } = req.body

        if(!email||!password){
            return res.status(404).json({
                message:" fill your data ",
                isSuccess:false
            })
        }

        //user is axist

        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            return res.status(404).json({
                message:'wrong credentials',
                isSuccess:false
            })
        }

        //dehash Pass 

        const dehash = bcrytp.compareSync(password, user.password)
        if(!dehash){
            return res.status(400).json({
                message:'wrong credentials',
                isSuccess : false
            })
        }

        //login person

        const result = {
            userId : user.id,
            name : user.userName,
            email :user.email,
            isAdmin : user.isAdmin,
            token : generateToken({
              id : user.id,
              email : user.email,
              userName : user.userName,
              isAdmin : user.isAdmin
            })
        }

        res.json({
            result:{...result},
            isSuccess:true
        })

    } catch (error) {
       res.status(500).json({
        message: "server error",
        isSuccess : false
       })
    }
}

//get one

export const getOneUser = async (req,res)=>{
    try {
        
        //use params

        // const {userId} = req.params

        const oneUser = await prisma.user.findUnique({
            where:{
                id : +req.params.id // + or parseInt convertion
            }
        })

        //ceckuser 

        if(!oneUser){
            return res.status(404).json({
                message: "mayaalo userku!!",
                isSuccess: false
            })
        }
        
        res.json({
            result:{...oneUser}
        })

    } catch (error) {
        res.status(500).json({
            message: "server error",
            isSuccess : false
           })
        
    }
}



export const getAllUser = async (req,res)=>{
    try {
       

        const oneUser = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                userName:true,
                isAdmin:true
            }
        })      
        
        res.json({
            result:[...oneUser]
        })

    } catch (error) {
        res.status(500).json({
            message: "server error",
            isSuccess : false
           }) 
    }
}



//update


//delete

