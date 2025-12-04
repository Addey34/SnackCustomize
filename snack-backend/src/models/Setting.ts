import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface ISetting
export interface ISetting extends Document {
  title?: string;
  logo?: string;
  colorTheme?: string;
}

// Définition du schéma Settings
const SettingSchema: Schema = new Schema(
  {
    title: { type: String, required: true, default: 'EshopCustomize' },
    logo: { type: String, required: true, default: 'defaultLogo.png' },
    colorTheme: { type: String, required: true, default: 'light' },
  },
  { timestamps: true },
);

// Exportation du modèle Settings
export default mongoose.model<ISetting>('Setting', SettingSchema);
