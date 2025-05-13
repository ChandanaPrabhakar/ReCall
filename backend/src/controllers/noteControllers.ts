import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { addNoteService } from "../services/noteServices";

export const addNoteController = async(req: Request, res: Response) => {
    const {title, content, tags} = req.body;
    const { user } = req.user as jwt.JwtPayload;

    if(!title || !content){
        return res.status(400).json({message: "title and content are required"});
    }

    try{
        const data = await addNoteService(title, content, tags, user);
        res.status(200).json({data, message: data?.message});

    }catch(error){
        console.error("Failed adding note", error);
        res.status(500).json({message: "Internal server error"});
    }
}