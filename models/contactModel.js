import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"userDetail"
    },
    name: {
        type: String,
        required: [true , "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the email name"]
    },
    phone: {
        type: String,
        required: [true, "Please add the phone name"]
    }
}, {
    collection: 'learningOne',
    timestamps: true
})

export default mongoose.model('contact',contactSchema)