const mongoose = require('mongoose');
// const dotenv=require('dotenv');
// dotenv.config({path:'./config/config.env'})

const connectDB=async ()=>{
    console.log(process.env.MONGO_URI)
    const conn= await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline.bold)
}

module.exports=connectDB;