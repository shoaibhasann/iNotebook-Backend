import mongoose from "mongoose";

// connect MongoDB database
const connectDatabase = async() => {
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully to host: ${connecting.connection.host}`)
    } catch (error) {
        console.log('Error to connecting database:', error);
    }
}

export default connectDatabase;