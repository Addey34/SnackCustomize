import type { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService.js';
import { loginSchema, registerSchema } from '../validation/authSchemas.js';

// Enregistrer un nouvel utilisateur
export const registerController = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log('Invalid data in register request:', parsed.error.issues);
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });
    }
    const { userId } = await registerUser(parsed.data);
    console.log('User successfully created with ID:', userId);
    res.status(201).json({ msg: 'Utilisateur créé', userId });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ msg: 'Erreur serveur', error: err });
  }
};

// Connecter un utilisateur existant
export const loginController = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log('Invalid data in login request:', parsed.error.issues);
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });
    }
    const { userId, token, role } = await loginUser(parsed.data);
    console.log('Login successful:', userId);
    res.json({ token, userId, role });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ msg: 'Erreur de connexion', error: err });
  }
};

// Route de test pour vérifier que le contrôleur fonctionne
export const test = async (req: Request, res: Response) => {
  console.log('Test route hit');
  res.json({ msg: 'Test route works!' });
};
