import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { exportBackup, getBackup, saveBackup } from '../controllers/backupController.js';

const router = Router();

router.get('/', requireAuth, getBackup);
router.post('/', requireAuth, saveBackup);
router.get('/export', requireAuth, exportBackup);

export default router;
