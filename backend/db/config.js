import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connect = async () => {
    await mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        throw err;
    });
};
export default connect;
