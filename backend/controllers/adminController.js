import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';
import { json } from "express";
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        console.log("Received request to add doctor:", req.body);

        // Check for missing fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password should be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Ensure image is uploaded
        let imageUrl = "";
if (imageFile) {
    console.log("Uploading image to Cloudinary...");
    try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        console.log("Cloudinary Response:", imageUpload);
        if (!imageUpload || !imageUpload.secure_url) {
            return res.status(500).json({ success: false, message: "Cloudinary upload failed" });
        }
        imageUrl = imageUpload.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ success: false, message: "Error uploading image to Cloudinary", error: error.message });
    }
} else {
    return res.status(400).json({ success: false, message: "Image is required" });
}

        

        // Ensure address is properly formatted
        let formattedAddress;
        try {
            formattedAddress = JSON.parse(address);
        } catch (err) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }

        // Check if doctor already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(409).json({ success: false, message: "Doctor with this email already exists" });
        }

        // Create new doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: formattedAddress,
            date: Date.now()
        };

        // Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor Added Successfully!" });
    } catch (error) {
        console.error("Error in addDoctor:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

//api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.error("Error in addDoctor:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}

export { addDoctor,loginAdmin };
