
import {Schema,model} from "mongoose";
import { stringify } from "querystring";

const OrderSchema = Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
     type:String,
     required: true,
    },
    phone:{
        type: String,
    },
    date:{
        type: String,
    },
    time:{
        type: String,           
        required: true,
    },
    totNum:{
        type: Number,
    },
    tableNumber:{
        type: String,
    },
    request:{
        type: String,
    },
    totalAmount:{
        type: String,
    },
    payment:{
        type: String,
    },

    items: [
        {
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const OrderModel = model('order', OrderSchema);
export default OrderModel;


