import NoteDBModel from "../models/note.model";
import {User} from "../models/user.model";

export const addNoteService = async (
  title: string,
  content: string,
  tags: string[],
  user: User,
) => {
  try {
    const newNote = new NoteDBModel({
      title,
      content,
      tags,
      userId: user.user._id
    });

    const savedNote = await newNote.save();

    return {
      success: true,
      note: savedNote,
      message: "Note added successfully.",
    };
  } catch (error) {
    console.error("Error adding note:", error);
    return {
      success: false,
      message: "Failed to add note.",
      error,
    };
  }
};
