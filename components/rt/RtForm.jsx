import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addRt } from '../../redux/rtSlice.js';
import { showToast } from '../../redux/uiSlice.js';
import Button from '../ui/Button.jsx';
import { upsertItem } from '../../services/firestoreService.js';

export default function RtForm({ desaId }) {
  const [nomor, setNomor] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function cleanRtRw(value) {
    return value
      .replace(/[^\d/]/g, '')
      .replace(/\/+/g, '/')
      .replace(/^\/+/, '')
      .split('/')
      .slice(0, 2)
      .join('/');
  }

  function submit(event) {
    event.preventDefault();
    const [rt, rw] = nomor.split('/').map((item) => item.trim());
    if (!rt || !rw) {
      dispatch(showToast('Isi format RT/RW, contoh 3/9'));
      return;
    }

    const action = addRt(desaId, `${Number(rt)}/${Number(rw)}`, user);
    dispatch(action);
    upsertItem(user.uid, 'rt', action.payload).catch(() => {
      dispatch(showToast('Gagal menyimpan RT/RW ke Firebase'));
    });
    dispatch(showToast('RT ditambahkan'));
    setNomor('');
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={nomor}
        onChange={(event) => setNomor(cleanRtRw(event.target.value))}
        placeholder="RT/RW, contoh 3/9"
      />
      <Button type="submit"><Plus size={18} /> RT/RW</Button>
    </form>
  );
}
