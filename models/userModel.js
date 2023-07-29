import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the email name"],
        unique:[true,'Email address already exist']
    },
    password: {
        type: String,
        required: [true, "Please add the phone name"]
    }
}, {
    timestamps: true
})

export default mongoose.model('userDetail', userSchema)