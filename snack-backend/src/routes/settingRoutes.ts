import { Router, type Request, type Response } from 'express';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
import Settings from '../models/Setting.js';
import { settingsSchema } from '../validation/settingScehma.js';

const router: Router = Router();

// GET settings (public)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Erreur récupération des paramètres', error: err });
  }
});

// UPDATE settings (admin)
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const parsed = settingsSchema.safeParse(req.body);
      if (!parsed.success) {
        return res
          .status(400)
          .json({ msg: 'Données invalides', errors: parsed.error.issues });
      }
      const settings = await Settings.findByIdAndUpdate(
        req.params.id,
        parsed.data,
        { new: true },
      );
      res.json(settings);
    } catch (err) {
      res
        .status(500)
        .json({ msg: 'Erreur modification des paramètres', error: err });
    }
  },
);

export default router;
