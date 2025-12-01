import type { Request, Response } from 'express';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle
} from '../services/articleService.js';
import { articleSchema } from '../validation/articleSchemas.js';

// Créer un article
export const createArticleController = async (req: Request, res: Response) => {
  try {
    const parsed = articleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ msg: 'Données invalides', errors: parsed.error.issues });
    }
    const article = await createArticle(parsed.data);
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ msg: "Erreur création de l'article", error: err });
  }
};

// Récupérer tous les articles
export const getAllArticlesController = async (req: Request, res: Response) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur récupération des articles', error: err });
  }
};

// Récupérer un article par son ID
export const getArticleByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'ID manquant' });
  }
  try {
    const article = await getArticleById(id);
    res.json(article);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erreur récupération de l'article", error: err });
  }
};

// Mettre à jour un article
export const updateArticleController = async (req: Request, res: Response) => {
  const parsed = articleSchema.safeParse(req.body);
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
    const article = await updateArticle(id, parsed.data);
    res.json(article);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erreur modification de l'article", error: err });
  }
};

// Supprimer un article
export const deleteArticleController = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: 'ID manquant' });
  }
  try {
    const response = await deleteArticle(id);
    res.json(response);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erreur suppression de l'article", error: err });
  }
};
