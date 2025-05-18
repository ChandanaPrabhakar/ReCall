import { Request, Response } from "express";
import { signupService, loginService, getUserService } from "../services/authServices";
import jwt from 'jsonwebtoken';

export const signupController = async (req: Request, res: Response): Promise<void> => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const data = await signupService(req.body);

        if (!data?.success) {
            res.status(400).json({ message: data?.message });
        }
        res.status(201).json({ data });

    } catch (error) {
        console.error("something went wrong", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "credentials are required" });
    }

    try {
        const data = await loginService(email, password);

        if (!data?.success) {
            res.status(404).json({ message: data?.message });
            return;
        }
        res.status(200).json({ data });

    } catch (error) {
        console.error("something went wrong", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserController = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.user as jwt.JwtPayload;

    try {
        const data = await getUserService(user._id);

        if (!data?.success) {
            res.status(404).json({ message: data?.message });
            return;
        }

        res.status(201).json({ data, message: data?.message });
    } catch (error) {
        console.error("Error fetching user details", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}