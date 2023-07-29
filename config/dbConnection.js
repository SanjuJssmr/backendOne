import mongoose from "mongoose";

export const connectDb = async () => {
    try {

        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongodb connected', connect.connection.host,connect.connection.name);

    } catch (error) {
        console.log(err);
        process.exit(1)
    }
}