import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addDesa } from '../../redux/desaSlice.js';
import { showToast } from '../../redux/uiSlice.js';
import Button from '../ui/Button.jsx';

export default function DesaForm() {
  const [nama, setNama] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function submit(event) {
    event.preventDefault();
    if (!nama.trim()) return;
    dispatch(addDesa(nama.trim(), user));
    dispatch(showToast('Desa ditambahkan'));
    setNama('');
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={nama} onChange={(event) => setNama(event.target.value)} placeholder="Nama desa" />
      <Button type="submit"><Plus size={18} /> Desa</Button>
    </form>
  );
}
