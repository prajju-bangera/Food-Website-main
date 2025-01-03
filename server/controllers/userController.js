import UserModel from "../model/UserModel.js"
import bcrypt from "bcryptjs"

export const userLogin = async (req,res) =>{
    const {email, password} = req.body

    console.log({email, password})
    try{
        const userExists = await UserModel.findOne({email})
        if(!userExists) return res.status(400).json({error:"User not found!"})

        const matchPassword = await bcrypt.compare(password, userExists.password)
        if(!matchPassword) return res.status(400).json({error:"Invalid Username or Password!"})

        res.send({user:userExists, status:true})
    }catch(err){
        console.log("\nLogin_Error : ", err)
    }
}

export const userRegister = async (req,res) =>{
    const {username, email, password, phone} = req.body

    console.log({username, email, password, phone})
    try{
        const userExists = await UserModel.findOne({email})
        if(userExists) return res.status(400).json({error:"Email already used!"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            username:username,
            email:email,
            password:hashedPassword,
            phone:phone
        })

        res.send({newUser, status:true})
    }catch(err){
        console.log("\nRegister_Error : ", err)
    }
}