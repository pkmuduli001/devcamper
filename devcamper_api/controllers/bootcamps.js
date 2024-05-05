const ErrorResponse =require('../utils/errorResponse');
const asyncHandler=require('../middleware/async')
const Bootcamp=require('../models/Bootcamp');
const { param } = require('../routes/bootcamps');
//@desc   Get all bootcamps
//@route  GET /api/v1/bootcamps
//@access Public 
exports.getBootcamps=asyncHandler(async (req,res,next)=>{
        let query;

        const reqQuery={...req.query};

        const removeFields=['select','sort'];

        removeFields.forEach(param=>delete reqQuery[param])

        console.log(reqQuery);

        let queryStr=JSON.stringify(reqQuery);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);

        // console.log(queryStr)
        query=Bootcamp.find(JSON.parse(queryStr));
        
        //select fields
        if(req.query.select){
            const fields=req.query.select.split(',').join(" ");
            query=query.select(fields)
        }

        //sort
        if(req.query.sort){
            const sortBy=req.query.sort.split(',').join(" ");
            query=query.sort(sortBy)
        }else{
            query.sort('-createdAt')
        }
        
        const bootcamps=await query

        res.
        status(200).
        json({success:true,count:bootcamps.length,data:bootcamps})
    
    
})


//@desc   Get single bootcamps
//@route  GET /api/v1/bootcamps/:id
//@access Public 
exports.getBootcamp=asyncHandler(async (req,res,next)=>{
    
        const bootcamp=await Bootcamp.findById(req.params.id);
        if(!bootcamp){ 
            
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res.
        status(200).
        json({success:true,data:bootcamp})
    
})


//@desc   Create new bootcamp
//@route  POST /api/v1/bootcamps/
//@access Private
exports.createBootcamp=asyncHandler(async (req,res,next)=>{

    
        const bootcamp=await Bootcamp.create(req.body);
        if(!bootcamp){ 
            
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res
        .status(200)
        .json(
            {success:true,
            data:bootcamp})
    
   
})


//@desc   Update bootcamp
//@route  PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp=asyncHandler(async(req,res,next)=>{
     
        const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!bootcamp){ 
            
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res.
        status(200).
        json({success:true,data:bootcamp})
})
//@desc   Delete bootcamp
//@route  DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp=asyncHandler(async (req,res,next)=>{
        const bootcamp=await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp){ 
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }
        res.
        status(200).
        json({success:true,data:{}})
       
})
