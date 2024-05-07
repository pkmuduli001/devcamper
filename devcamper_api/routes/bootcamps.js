const express= require('express');

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
} =require('../controllers/bootcamps')

const Bootcamp=require('../models/Bootcamp')
const advancedResults=require('../middleware/advancedResults')
const { protect,authorize } = require('../middleware/auth');

//Include other resourse router
const courseRouter=require('./courses');
const reviewRouter=require('./reviews');


const router=express.Router();

//re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)
router.use('/:bootcampId/reviews',reviewRouter)

router.route('/')
.get(advancedResults(Bootcamp,'courses'),getBootcamps)
.post(protect,authorize('publisher','admin'),createBootcamp);


router.route('/:id')
.get(getBootcamp)
.put(protect,authorize('publisher','admin'),updateBootcamp)
.delete(protect,authorize('publisher','admin'),deleteBootcamp);


module.exports=router;