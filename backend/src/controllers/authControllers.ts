import { Request, Response } from "express";
import { signupService, loginService } from "../services/authServices";

export const signupController = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const data = await signupService(req.body);

        if (!data?.success) {
           return res.status(400).json({ message: data?.message });
        }
        res.status(201).json({ data });

    } catch (error) {
        console.error("something went wrong", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "credentials are required"});
    }

    try{
        const data = await loginService(email, password);

        if(!data?.success){
            return res.status(404).json({message: data?.message});
        }
        res.status(200).json({data});

    }catch(error) {
        console.error("something went wrong", error);
        res.status(500).json({message: "Internal server error"});
    }
}