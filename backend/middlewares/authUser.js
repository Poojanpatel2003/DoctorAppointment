import jwt from 'jsonwebtoken';

const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next()
        } catch (error) {
        console.error("Error in addDoctor:", error);
        res.json({ success: false, error: error.message });
    }
}
export default authUser;