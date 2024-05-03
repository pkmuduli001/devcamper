const express= require('express');
const dotenv=require('dotenv');
const logger=require('./middleware/logger')
const morgan=require('morgan');
var colors = require('colors');
const bootcamps=require('./routes/bootcamps')
const connectDB=require('./config/db')

//load env variable
dotenv.config({path:'./config/config.env'})

//connect to database
connectDB();

const app=express();

app.use(express.json())

if(process.env.NODE_ENV==="developement"){
    app.use(morgan('dev'))
}

// app.use(logger);

// mount router
app.use('/api/v1/bootcamps',bootcamps)

const PORT= process.env.PORT || 5000;

const server=app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1))
})