import mongoose, { Document, Model } from "mongoose";

export interface Note extends Document {
    title: string;
    content: string;
    tags?: string[];
    isPinned: boolean;
    userId: string;
    createdOn?: Date;
}

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {            
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const NoteDBModel: Model<Note> = mongoose.model<Note>('NoteDBModel', NoteSchema);
export default NoteDBModel;