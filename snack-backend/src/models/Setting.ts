import mongoose, { Document, Schema } from 'mongoose';

// Définition de l'interface ISettings
export interface ISettings extends Document {
  themeColor?: string;
  logoUrl?: string;
}

// Définition du schéma Settings
const SettingsSchema: Schema = new Schema(
  {
    themeColor: String,
    logoUrl: String,
  },
  { timestamps: true },
);

// Exportation du modèle Settings
export default mongoose.model<ISettings>('Settings', SettingsSchema);
