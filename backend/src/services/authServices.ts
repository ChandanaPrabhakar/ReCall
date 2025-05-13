import { signupInput } from "../models/signupInput.model";
import { UserDBModel } from "../models/user.model";
import jwt from 'jsonwebtoken';

export const signupService = async (data: signupInput) => {
    try {
        const existingUser = await UserDBModel.findOne({ email: data.email });
        if (existingUser) return null;

        const newUser = new UserDBModel(data);
        await newUser.save();

        const accessToken = jwt.sign({newUser}, process.env.ACCESS_TOKEN_SECRET as string,{expiresIn: '36000m'});

        return {
            success: true,
            user: newUser,
            accessToken,
            message: "User registered successfully.",
        };

    } catch (error) {
        console.error("Error in creating an account:", error);
        return {
            success: false,
            message: "Something went wrong during signup.",
            error,
        };
    }
};
