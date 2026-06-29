import { getAdminAuth } from '../firebase/admin.js';

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    req.user = await getAdminAuth().verifyIdToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message || 'Token tidak valid' });
  }
}
