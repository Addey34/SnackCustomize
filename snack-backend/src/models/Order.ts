import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface IOrderItem
interface IOrderItem {
  article: mongoose.Types.ObjectId;
  quantity: number;
}

// Définition de l'interface IOrder
export interface IOrder extends Document {
  client: mongoose.Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'completed';
}

// Définition du schéma Order
const OrderSchema: Schema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        article: { type: Schema.Types.ObjectId, ref: 'Article' },
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

// Exportation du modèle Order
export default mongoose.model<IOrder>('Order', OrderSchema);
