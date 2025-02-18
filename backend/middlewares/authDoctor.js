import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const dtoken =
            req.headers["dtoken"] || req.headers["Dtoken"] || req.headers["authorization"];

        // console.log("Received Token:", dtoken);

        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized. Login Again doctor" });
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.docId = token_decode.id;

        next();
    } catch (error) {
        console.error("Error in authDoctor middleware:", error);
        res.json({ success: false, error: error.message });
    }
};

export default authDoctor;

