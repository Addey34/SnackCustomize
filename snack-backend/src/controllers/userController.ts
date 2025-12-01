import type { Request, Response } from 'express';
import {
  getAllUsers,
  getCurrentUser,
  updateUser,
} from '../services/userService.js';
import { updateUserSchema } from '../validation/userSchema.js';

// Récupérer tous les utilisateurs (pour les admins)
export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};

// Récupérer l'utilisateur connecté
export const getCurrentUserController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await getCurrentUser(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};

// Mettre à jour un utilisateur (lui-même)
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });

    const userId = (req as any).user.id;
    console.log(userId, '&&', req.params.id);
    if (userId !== req.params.id)
      return res.status(403).json({ msg: 'Not authorized' });

    const updatedUser = await updateUser(userId, parsed.data);
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};
