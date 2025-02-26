import {Schema,model} from "mongoose";

const feedbackSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
        min:1,
        max:5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const feedbackModel = model('feedback', feedbackSchema);
export default feedbackModel;


