import NoteDBModel from "../models/note.model";

export const addNoteService = async (title: string, content: string, tags: string[], userId: string) => {

  try {
    const newNote = new NoteDBModel({
      title,
      content,
      tags,
      userId: userId
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
    };
  }
};

export const editNoteService = async (noteId: string, title: string, content: string, tags: string[], isPinned: boolean, userId: string) => {
  const note = await NoteDBModel.findOne({ _id: noteId, userId: userId });

  if (!note) {
    return {
      success: false,
      message: "Note not found"
    }
  }

  if (title) note.title = title;
  if (content) note.content = content;
  if (tags) note.tags = tags;
  if (isPinned) note.isPinned = isPinned;

  try {
    const updatedNote = await note.save();

    return {
      success: true,
      updatedNote,
      message: "Note updated successfully"
    }
  } catch (error) {
    return {
      success: true,
      message: "Failed to update note."
    }
  }


}

export const updateNotePinnedService = async (noteId: string, isPinned: boolean, userId: string) => {
  const note = await NoteDBModel.findOne({ _id: noteId, userId: userId });

  if (!note) {
    return {
      success: false,
      message: "Note not found"
    }
  }

  if (isPinned) note.isPinned = isPinned;

  try {
    const updatedNote = await note.save();

    return {
      success: true,
      updatedNote,
      message: "Note updated successfully"
    }
  } catch (error) {
    return {
      success: true,
      message: "Failed to update note."
    }
  }
}

export const getAllNotesService = async (userId: string) => {
  try {
    const notes = await NoteDBModel.find({ userId: userId }).sort({ isPinned: -1 });
    return {
      success: true,
      notes,
      message: "All notes retrieved successfully."
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch notes."
    }
  }
}

export const deleteNoteService = async (noteId: string, userId: string) => {

  try {
    const note = await NoteDBModel.findOneAndDelete({ _id: noteId, userId: userId });

    if (note) {
      return {
        success: true,
        message: "Note deleted successfully."
      };
    } else {
      return {
        success: false,
        message: "Note not found or not authorized."
      };
    }
  } catch (error) {
    console.error("Error deleting note:", error);

    return {
      success: false,
      message: "Failed to delete note."
    };
  }
}

export const searchNoteService = async (userId: string, query: string) => {
  try {

    const notes = await NoteDBModel.find({userId: userId})

    const matchingNote = await NoteDBModel.find({
      userId: userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } }
      ]
    })

    if (!matchingNote) {
      return {
        success: false,
        message: "Note matching note found"
      }
    } else {
      return {
        success: true,
        note: matchingNote,
        message: "Matching note found"
      }
    }
  } catch (error) {
    console.error("Error finding note:", error);

    return {
      success: false,
      message: "Failed to find note."
    };
  }
}