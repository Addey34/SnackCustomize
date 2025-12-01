import Article from '../models/Article.js';
import type { ArticleData } from '../validation/articleSchemas.js';

// Créer un article
export const createArticle = async (data: ArticleData) => {
  try {
    const article = await Article.create(data);
    return article;
  } catch (err) {
    console.error("Erreur création de l'article", err);
    throw new Error("Erreur lors de la création de l'article");
  }
};

// Récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const articles = await Article.find().populate('category');
    return articles;
  } catch (err) {
    console.error('Erreur récupération des articles', err);
    throw new Error('Erreur lors de la récupération des articles');
  }
};

// Récupérer un article par son ID
export const getArticleById = async (id: string) => {
  try {
    const article = await Article.findById(id).populate('category');
    return article;
  } catch (err) {
    console.error("Erreur récupération de l'article", err);
    throw new Error("Erreur lors de la récupération de l'article");
  }
};

// Mettre à jour un article
export const updateArticle = async (id: string, data: ArticleData) => {
  try {
    const article = await Article.findByIdAndUpdate(id, data, {
      new: true,
    });
    return article;
  } catch (err) {
    console.error("Erreur modification de l'article", err);
    throw new Error("Erreur lors de la modification de l'article");
  }
};

// Supprimer un article
export const deleteArticle = async (id: string) => {
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      throw new Error('Article non trouvé');
    }
  } catch (err) {
    console.error("Erreur suppression de l'article", err);
    throw new Error("Erreur lors de la suppression de l'article");
  }
};
