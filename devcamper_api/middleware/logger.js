// @desc Logs request console
const logger=(req,res,next)=>{
    req.hello='hello world';
    console.log('middleware ran');
    next();
}

module.exports=logger;