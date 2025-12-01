import type { Request, Response } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../services/categoryService.js';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validation/categorySchema.js';

// Créer une catégorie
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });
    }
    const category = await createCategory(parsed.data);
    res.status(201).json(category);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur création de la catégorie', error: err });
  }
};

// Récupérer toutes les catégories
export const getAllCategoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur récupération des catégories', error: err });
  }
};

// Récupérer une catégorie par son ID
export const getCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'ID manquant' });
  }
  try {
    const category = await getCategoryById(id);
    res.json(category);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur récupération de la catégorie', error: err });
  }
};

// Mettre à jour une catégorie
export const updateCategoryController = async (req: Request, res: Response) => {
  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ msg: 'Données invalides', errors: parsed.error.issues });
  }
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'ID manquant' });
  }
  try {
    const category = await updateCategory(id, parsed.data);
    res.json(category);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur modification de la catégorie', error: err });
  }
};

// Supprimer une catégorie
export const deleteCategoryController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'ID manquant' });
  }
  try {
    await deleteCategory(id);
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur suppression de la catégorie', error: err });
  }
};
