import { readBackup, writeBackup } from '../services/backupService.js';

export async function getBackup(req, res, next) {
  try {
    const data = await readBackup(req.user.uid);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function saveBackup(req, res, next) {
  try {
    const data = await writeBackup(req.user.uid, req.body);
    res.json({ message: 'Backup tersimpan', data });
  } catch (error) {
    next(error);
  }
}

export async function exportBackup(req, res, next) {
  try {
    const data = await readBackup(req.user.uid);
    res.setHeader('Content-Disposition', `attachment; filename="${req.user.uid}.json"`);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
