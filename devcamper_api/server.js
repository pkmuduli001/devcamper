const express= require('express');
const dotenv=require('dotenv');
const logger=require('./middleware/logger')
const morgan=require('morgan');
const colors = require('colors');
const errorHandler=require('./middleware/error');
const cookieParser = require('cookie-parser')
const connectDB=require('./config/db')

//load env variable
dotenv.config({path:'./config/config.env'})

//connect to database
connectDB();

const bootcamps=require('./routes/bootcamps');
const courses=require('./routes/courses');
const auth=require('./routes/auth');
const users=require('./routes/users');
const reviews=require('./routes/reviews');


const app=express();

app.use(express.json())

//add middleware cookieParser
app.use(cookieParser())

if(process.env.NODE_ENV==="developement"){
    app.use(morgan('dev'))
}

// app.use(logger);

// mount router
app.use('/api/v1/bootcamps',bootcamps);
app.use('/api/v1/courses',courses);
app.use('/api/v1/auth',auth)
app.use('/api/v1/users',users)
app.use('/api/v1/reviews',reviews)

app.use(errorHandler)

const PORT= process.env.PORT || 5000;

const server=app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1))
})