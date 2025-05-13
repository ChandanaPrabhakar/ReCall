import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdOn?: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const UserDBModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
