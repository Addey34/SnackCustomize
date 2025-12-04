import { Router } from 'express';
import {
  createDefaultSettingsController,
  getSettingsController,
  updateSettingsController,
} from '../controllers/settingController.js';

const router: Router = Router();

router.post('/', createDefaultSettingsController);

// Route pour récupérer les settings
router.get('/', getSettingsController);

// Route pour mettre à jour les settings
router.put('/', updateSettingsController);

export default router;
