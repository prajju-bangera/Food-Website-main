import {Schema,model} from "mongoose";

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
        min: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const UserModel = model('user', UserSchema);
export default UserModel;


