import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

function filePath(uid) {
  return join(DATA_DIR, `${uid}.json`);
}

export async function readBackup(uid) {
  try {
    const content = await readFile(filePath(uid), 'utf8');
    return JSON.parse(content);
  } catch {
    return {
      user: { uid, nama: '', email: '', photo: '' },
      desa: [],
      rt: [],
      keluarga: []
    };
  }
}

export async function writeBackup(uid, payload) {
  await mkdir(DATA_DIR, { recursive: true });
  const data = {
    ...payload,
    meta: {
      uid,
      updatedAt: new Date().toISOString()
    }
  };
  await writeFile(filePath(uid), JSON.stringify(data, null, 2), 'utf8');
  return data;
}
