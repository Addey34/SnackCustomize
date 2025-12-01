import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface ICategory
export interface ICategory extends Document {
  name: string;
}

// Définition du schéma Category
const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

// Exportation du modèle Category
export default mongoose.model<ICategory>('Category', CategorySchema);
