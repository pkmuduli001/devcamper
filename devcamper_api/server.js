const express= require('express');
const dotenv=require('dotenv');
const logger=require('./middleware/logger')
const morgan=require('morgan');

const bootcamps=require('./routes/bootcamps')
dotenv.config({path:'./config/config.env'})

const app=express();

if(process.env.NODE_ENV==="developement"){
    app.use(morgan('dev'))
}

// app.use(logger);

// mount router
app.use('/api/v1/bootcamps',bootcamps)

const PORT= process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));