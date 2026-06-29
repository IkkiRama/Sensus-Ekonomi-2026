import admin from 'firebase-admin';

function ensureAdmin() {
  if (admin.apps.length) return admin;

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin belum dikonfigurasi. Isi .env di root project terlebih dahulu.');
  }

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey })
  });

  return admin;
}

export const firebaseAdmin = admin;
export function getAdminAuth() {
  return ensureAdmin().auth();
}

export function getAdminDb() {
  return ensureAdmin().firestore();
}
