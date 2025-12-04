import User from '../models/User.js';
import type { UpdateUserData } from '../validation/userSchema.js';

// Récupérer tous les utilisateurs (pour les admins)
export const getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};

// Récupérer l'utilisateur connecté
export const getUser = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

// Mettre à jour un utilisateur (lui-même)
export const updateUser = async (userId: string, data: UpdateUserData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, data, {
    new: true,
  }).select('-password');
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};
