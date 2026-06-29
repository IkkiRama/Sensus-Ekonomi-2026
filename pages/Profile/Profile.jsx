import { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { setDesa } from '../../redux/desaSlice.js';
import { setRt } from '../../redux/rtSlice.js';
import { setKeluarga } from '../../redux/keluargaSlice.js';
import { showToast } from '../../redux/uiSlice.js';
import { useBackupApi } from '../../hooks/useBackupApi.js';

export default function Profile() {
  const dispatch = useDispatch();
  const [photoError, setPhotoError] = useState(false);
  const { user, ownerUid } = useSelector((state) => state.auth);
  const data = useSelector((state) => ({ user: state.auth.user, desa: state.desa.items, rt: state.rt.items, keluarga: state.keluarga.items }));
  const { saveBackup } = useBackupApi();

  function exportJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.uid}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = JSON.parse(reader.result);
      dispatch(setDesa(parsed.desa || []));
      dispatch(setRt(parsed.rt || []));
      dispatch(setKeluarga(parsed.keluarga || []));
      dispatch(showToast('JSON berhasil diimpor'));
    };
    reader.readAsText(file);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h1 className="page-title">Profil</h1>
      <Card>
        <div className="flex items-center gap-4">
          {user.photo && !photoError ? (
            <img
              src={user.photo}
              alt={user.nama}
              referrerPolicy="no-referrer"
              onError={() => setPhotoError(true)}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-black text-primary dark:bg-blue-950">
              {(user.nama || user.email || 'U').slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="font-bold">{user.nama}</h2>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-xs text-slate-400">Owner aktif: {ownerUid === user.uid ? 'Ya' : 'Tidak'}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={exportJson}><Download size={18} /> Export JSON</Button>
          <Button variant="success" onClick={saveBackup}>Backup Server</Button>
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100">
            <Upload size={18} /> Import JSON
            <input type="file" accept="application/json" className="hidden" onChange={importJson} />
          </label>
        </div>
      </Card>
    </div>
  );
}
