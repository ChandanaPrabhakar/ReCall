import { signupInput } from "../models/signupInput.model";
import { User, UserDBModel } from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signupService = async (data: signupInput) => {
    try {
        const existingUser = await UserDBModel.findOne({ email: data.email });
        if (existingUser) return {
            success: false,
            message: "User already exists, please login."
        };

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = { ...data, password: hashedPassword };

        const userDetails = new UserDBModel(userData);
        await userDetails.save();

        const user = {
            "_id": userDetails._id,
            fullName: userDetails.fullName,
            email: userDetails.email
        }

        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '36000m' });

        return {
            success: true,
            user: user,
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

export const loginService = async (email: string, password: string) => {
    try {
        const userInfo = await UserDBModel.findOne({ email: email });

        if (!userInfo) {
            return {
                success: false,
                message: "User not found, Sign Up."
            }
        }

        const isPasswordValid = await bcrypt.compare(password, userInfo.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid credentials"
            };
        }


        const user = {
            "_id": userInfo._id,
            fullName: userInfo.fullName,
            email: userInfo.email,
        };
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "36000m" });

        return {
            success: true,
            email: email,
            accessToken,
            message: "Login successful"
        }
    } catch (error) {
        console.error("Error logging in", error);
        return {
            success: false,
            message: "Invalid credentials"
        }
    }
}

export const getUserService = async (userId: string) => {
    try {
        const userDetails = await UserDBModel.findOne({ _id: userId });

        if (!userDetails) {
            return {
                success: false,
                message: 'User not found.'
            }
        }

        return {
            success: true,
            user: { fullName: userDetails.fullName, email: userDetails.email, "_id": userDetails._id, createdOn: userDetails.createdOn },
            message: 'User details retrieved successfully.'
        }
    } catch (error) {
        return {
            success: false,
            message: 'Unable to fetch user details.'
        }
    }
}