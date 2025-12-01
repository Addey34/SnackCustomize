import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface IArticle
export interface IArticle extends Document {
  name: string;
  price: number;
  category: mongoose.Types.ObjectId;
  description?: string;
  image?: string;
  promo?: number;
}

// Définition du schéma Article
const ArticleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: String,
    image: String,
    promo: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Exportation du modèle Article
export default mongoose.model<IArticle>('Article', ArticleSchema);
