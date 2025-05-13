import { Request, Response } from "express";
import { signupService } from "../services/authServices";

export const signupController = async(req: Request, res: Response) => {

    try{
        const data = await signupService(req.body);

        if(!data?.success){
            return res.status(400).json({message: data?.message});
        }
        return res.status(201).json({data});
    }catch(error){
        console.error("something went wrong",error);
        return res.status(500).json({message: "Internal server error"});
    }
}