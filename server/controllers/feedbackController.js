import feedbackModel from "../model/feedbackModel.js"

export const submitFeedback = async (req,res) =>{
    const {name, message, rating } = req.body

    console.log({name, message, rating})
    try{
        // const userExists = await OrderModel.findOne({email})
        // if(!userExists) return res.status(400).json({error:"User not Found!"})


        const newFeedback = await feedbackModel.create({
            name, message, rating
        })

        console.log("feedback",newFeedback)
        res.send({newFeedback, status:true})
    }catch(err){
        console.log("\nfeedback_Error : ", err)
    }
}