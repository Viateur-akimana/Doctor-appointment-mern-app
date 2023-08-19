const jwt= require("jsonwebtoken");
module.exports = async(req,res,next) =>{
    try {
    const token = req.headers['Authorization'].split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET, (err,decodedToken) =>{
    if(err){
        return res.status(500).send({
            success:false,
            message:"Auth failed"
        });
    }
    else{
        req.body.userId == decodedToken.id;
        next();
    }
    })
} catch (err) {
     res.status(500).send({
        message:"Auth failed",
        success:false
     })
}
}