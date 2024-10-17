import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'provider' | 'payer';
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['provider', 'payer'], 
    required: true,
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
