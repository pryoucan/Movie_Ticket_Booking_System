import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
    const { username, mobile, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ username }, { mobile }, { email }]
        });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists with this entry"
            });
        }

        const user = await User.create({
            username,
            mobile,
            email,
            password
        });
        
        return res.status(201).json({
            message: "User registered successfully",
            user
        });
    }
    catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        if(!(await user.comparePassword(password))) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = await jwt.sign({ id: user._id }, 
            process.env.JWT_KEY, 
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successfull",
            token
        });
    }
    catch(error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export { userRegister, userLogin };