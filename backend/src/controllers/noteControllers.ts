import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { addNoteService, editNoteService, updateNotePinnedService, getAllNotesService, deleteNoteService, searchNoteService } from "../services/noteServices";

export const addNoteController = async (req: Request, res: Response): Promise<void> => {
    const { title, content, tags } = req.body;
    const { user } = req.user as jwt.JwtPayload;

    if (!title || !content) {
        res.status(400).json({ message: "title and content are required" });
    }

    try {
        const data = await addNoteService(title, content, tags, user._id);
        res.status(200).json({ data, message: data?.message });

    } catch (error) {
        console.error("Failed adding note", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const editNoteController = async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user as jwt.JwtPayload;

    if (!title && !content && !tags) {
        res.status(400).json({ message: "No changes provided" });
    }

    try {
        const data = await editNoteService(noteId, title, content, tags, isPinned, user._id);
        if (!data?.success) {
            res.status(404).json({ message: data?.message });
        }
        res.status(200).json({ data, message: data?.message });
    } catch (error) {
        console.error("Failed editing note", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateNotePinnedController = async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { user } = req.user as jwt.JwtPayload;

    try {
        const data = await updateNotePinnedService(noteId, isPinned, user._id);
        if (!data?.success) {
            res.status(404).json({ message: data?.message });
        }
        res.status(200).json({ data, message: data?.message });
    } catch (error) {
        console.error("Failed to update note", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllNotesController = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.user as jwt.JwtPayload;

    try {
        const data = await getAllNotesService(user._id);
        res.status(200).json({ data, message: data?.message });
    } catch (error) {
        console.error('Error fetching notes', error);
        res.status(500).json({ message: 'Internal serer error' });
    }
}

export const deleteNoteController = async (req: Request, res: Response): Promise<void> => {
    const { noteId } = req.params;
    const { user } = req.user as jwt.JwtPayload;

    try {
        const data = await deleteNoteService(noteId, user._id);
        if (!data?.success) {
            res.status(404).json({ message: data?.message });
        }
        res.status(200).json({ message: data?.message });
    } catch (error) {
        console.error("Failed deleting note", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const searchNoteController = async (req: Request, res: Response): Promise<void> => {
    const { user } = req.user as jwt.JwtPayload;
    const { query } = req.query;

    if (typeof query !== 'string') {
        throw new Error('Search query must be a string');
    }

    if (!query) {
        res.status(400).json({ message: 'search query is required' });
        return;
    }

    try {
        const data = await searchNoteService(user._id, query);
        if (!data?.success) {
            res.status(404).json({ message: data?.message });
            return;
        }

        res.status(200).json({ data, message: data?.message });

    } catch (error) {
        console.error("Failed to search note", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}