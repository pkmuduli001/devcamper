const express= require('express');

const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
} =require('../controllers/bootcamps')

//Include other resourse router
const courseRouter=require('./courses');

const router=express.Router();

//re-route into other resourse router
router.use('/:bootcampId/courses',courseRouter)

router.route('/').get(getBootcamps);
router.route('/:id').get(getBootcamp);

router.route('/').post(createBootcamp);
router.route('/:id').put(updateBootcamp);
router.route('/:id').delete(deleteBootcamp);


module.exports=router;