import { collection, deleteDoc, doc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config.js';

function userCollection(uid, name) {
  return collection(db, 'users', uid, name);
}

function mergeById(primary, fallback) {
  const items = new Map();
  for (const item of fallback) items.set(item.id, item);
  for (const item of primary) items.set(item.id, item);
  return Array.from(items.values());
}

async function loadNestedUserData(uid) {
  const desaSnapshot = await getDocs(userCollection(uid, 'desa'));
  const desa = desaSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  const rt = [];
  const keluarga = [];

  for (const desaItem of desa) {
    const rtSnapshot = await getDocs(collection(db, 'users', uid, 'desa', desaItem.id, 'rt'));

    for (const rtDoc of rtSnapshot.docs) {
      const rtItem = { id: rtDoc.id, desaId: desaItem.id, ...rtDoc.data() };
      rt.push(rtItem);

      const keluargaSnapshot = await getDocs(collection(db, 'users', uid, 'desa', desaItem.id, 'rt', rtDoc.id, 'keluarga'));
      keluarga.push(
        ...keluargaSnapshot.docs.map((item) => ({
          id: item.id,
          rtId: rtDoc.id,
          ...item.data()
        }))
      );
    }
  }

  return { desa, rt, keluarga };
}

export async function loadUserData(uid) {
  const [desaSnapshot, rtSnapshot, keluargaSnapshot, nestedData, publicData] = await Promise.all([
    getDocs(userCollection(uid, 'desa')),
    getDocs(userCollection(uid, 'rt')),
    getDocs(userCollection(uid, 'keluarga')),
    loadNestedUserData(uid).catch(() => ({ desa: [], rt: [], keluarga: [] })),
    loadPublicData().catch(() => ({ desa: [], rt: [], keluarga: [] }))
  ]);

  const privateData = {
    desa: desaSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
    rt: rtSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
    keluarga: keluargaSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
  };
  const publicOwnerData = {
    desa: publicData.desa.filter((item) => item.ownerUid === uid),
    rt: publicData.rt.filter((item) => item.ownerUid === uid),
    keluarga: publicData.keluarga.filter((item) => item.ownerUid === uid)
  };

  return {
    desa: mergeById(mergeById(privateData.desa, nestedData.desa), publicOwnerData.desa),
    rt: mergeById(mergeById(privateData.rt, nestedData.rt), publicOwnerData.rt),
    keluarga: mergeById(mergeById(privateData.keluarga, nestedData.keluarga), publicOwnerData.keluarga)
  };
}

export async function loadPublicData() {
  const [desaSnapshot, rtSnapshot, keluargaSnapshot] = await Promise.all([
    getDocs(collection(db, 'public_desa')),
    getDocs(collection(db, 'public_rt')),
    getDocs(collection(db, 'public_keluarga'))
  ]);

  return {
    desa: desaSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
    rt: rtSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })),
    keluarga: keluargaSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
  };
}

export async function saveUserData(uid, data) {
  const batch = writeBatch(db);

  for (const name of ['desa', 'rt', 'keluarga']) {
    const currentIds = new Set((data[name] || []).map((item) => item.id));
    const existingSnapshot = await getDocs(userCollection(uid, name));

    for (const existingDoc of existingSnapshot.docs) {
      if (!currentIds.has(existingDoc.id)) {
        batch.delete(doc(db, 'users', uid, name, existingDoc.id));
        batch.delete(doc(db, `public_${name}`, existingDoc.id));
      }
    }

    for (const item of data[name] || []) {
      batch.set(doc(db, 'users', uid, name, item.id), item, { merge: true });
      batch.set(doc(db, `public_${name}`, item.id), item, { merge: true });
    }
  }

  await batch.commit();
}

export async function upsertItem(uid, collectionName, item) {
  await Promise.all([
    setDoc(doc(db, 'users', uid, collectionName, item.id), item, { merge: true }),
    setDoc(doc(db, `public_${collectionName}`, item.id), item, { merge: true })
  ]);
}

export async function removeItem(uid, collectionName, id) {
  await Promise.all([
    deleteDoc(doc(db, 'users', uid, collectionName, id)),
    deleteDoc(doc(db, `public_${collectionName}`, id))
  ]);
}
