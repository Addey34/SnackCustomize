import Category from '../models/Category.js';
import type {
  CreateCategoryData,
  UpdateCategoryData,
} from '../validation/categorySchema.js';

// Créer une catégorie
export const createCategory = async (data: CreateCategoryData) => {
  try {
    const category = await Category.create(data);
    return category;
  } catch (err) {
    console.error('Erreur création de la catégorie', err);
    throw new Error('Erreur lors de la création de la catégorie');
  }
};

// Récupérer toutes les catégories
export const getAllCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.error('Erreur récupération des catégories', err);
    throw new Error('Erreur lors de la récupération des catégories');
  }
};

// Récupérer une catégorie par son ID
export const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findById(id);
    return category;
  } catch (err) {
    console.error('Erreur récupération de la catégorie', err);
    throw new Error('Erreur lors de la récupération de la catégorie');
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (id: string, data: UpdateCategoryData) => {
  try {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
  } catch (err) {
    console.error('Erreur modification de la catégorie', err);
    throw new Error('Erreur lors de la modification de la catégorie');
  }
};

// Supprimer une catégorie
export const deleteCategory = async (id: string) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      throw new Error('Catégorie non trouvée');
    }
  } catch (err) {
    console.error('Erreur suppression de la catégorie', err);
    throw new Error('Erreur lors de la suppression de la catégorie');
  }
};
