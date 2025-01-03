import OrderModel from "../model/OrderModel.js"

export const storeAmount = async (req,res) =>{
    const {name, email, phone, date, time, totNum, tableNumber, request, totalAmount, payment,items } = req.body

    console.log({name, email, phone, date, time, totNum, tableNumber, request, totalAmount, payment, items})
    try{
        // const userExists = await OrderModel.findOne({email})
        // if(!userExists) return res.status(400).json({error:"User not Found!"})


        const newOrder = await OrderModel.create({
            name, email, phone, date, time, totNum, tableNumber, request, totalAmount, payment, items
        })

        console.log("newOrder",newOrder)
        res.send({newOrder, status:true})
    }catch(err){
        console.log("\nOrder_Error : ", err)
    }
}