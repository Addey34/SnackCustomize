import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface IUser
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
  verified?: boolean;
}

// Définition du schéma User
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'client'], default: 'client' },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Exportation du modèle User
export default mongoose.model<IUser>('User', UserSchema);
