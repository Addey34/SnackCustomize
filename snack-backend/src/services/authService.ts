import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import type { loginData, registerData } from '../validation/authSchemas.js';

// Register a new user
export const registerUser = async (data: registerData) => {
  const { name, email, password } = data;
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new Error('Email déjà utilisé');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  return { userId: user._id };
};

// Login user
export const loginUser = async (data: loginData) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Identifiants invalides');
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1d' },
  );
  return {
    token,
    userId: user._id,
    role: user.role,
    email: user.email,
  };
};
