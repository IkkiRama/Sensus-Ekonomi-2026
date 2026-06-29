import { useState } from 'react';
import { Database } from 'lucide-react';
import { useSelector } from 'react-redux';
import Card from '../../components/ui/Card.jsx';

export default function Profile() {
  const [photoError, setPhotoError] = useState(false);
  const { user, ownerUid } = useSelector((state) => state.auth);

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
        <div className="mt-5 flex items-center gap-3 rounded border border-slate-200 p-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
          <Database size={18} className="text-primary" />
          Data aplikasi langsung dibaca dan disimpan ke Firebase Firestore.
        </div>
      </Card>
    </div>
  );
}
