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

        const removeFields=['select','sort','page','limit'];

        removeFields.forEach(param=>delete reqQuery[param])

        console.log(reqQuery);

        let queryStr=JSON.stringify(reqQuery);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);

        // console.log(queryStr)
        query=Bootcamp.find(JSON.parse(queryStr)).populate('courses');
        
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
        // pagination
        const page=parseInt(req.query.page,10) ||1;
        const limit=parseInt(req.query.limit,10) ||25;

        const startIndex=(page-1)*limit;
        const endIndex=page*limit;
        const total=await Bootcamp.countDocuments();

        query=query.skip(startIndex).limit(limit)

        
        //Executing query
        const bootcamps=await query

        // pagination result
        const pagination={};

        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }

        res.
        status(200).
        json({success:true,count:bootcamps.length,pagination,data:bootcamps})
    
    
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
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
        if(!bootcamp){ 
            return next(
                new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`,404)
            )
        }

        // bootcamp.remove();

        res.
        status(200).
        json({success:true,data:{}})
       
})
