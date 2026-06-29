import { useEffect, useMemo, useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addKeluarga, updateKeluarga } from '../../redux/keluargaSlice.js';
import { showToast } from '../../redux/uiSlice.js';
import Button from '../ui/Button.jsx';
import PengeluaranForm from '../pengeluaran/PengeluaranForm.jsx';
import { defaultPengeluaran } from '../../utils/pengeluaran.js';

export default function KeluargaForm({ rtId, keluarga, onDone, showPengeluaran = false }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const initial = useMemo(() => keluarga || { nama: '', alamat: '', catatan: '', pengeluaran: defaultPengeluaran }, [keluarga]);
  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  function change(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.nama.trim()) return;
    if (keluarga) {
      dispatch(updateKeluarga({ ...keluarga, ...form, updatedBy: user.uid }));
      dispatch(showToast('Keluarga diperbarui'));
    } else {
      dispatch(addKeluarga(rtId, form, user));
      dispatch(showToast('Keluarga ditambahkan'));
      setForm({ nama: '', alamat: '', catatan: '', pengeluaran: defaultPengeluaran });
    }
    onDone?.();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label>Nama kepala keluarga</label>
          <input value={form.nama} onChange={(event) => change('nama', event.target.value)} placeholder="Sarno" />
        </div>
        <div>
          <label>Alamat</label>
          <input value={form.alamat} onChange={(event) => change('alamat', event.target.value)} placeholder="Dusun / nomor rumah" />
        </div>
        <div>
          <label>Catatan</label>
          <input value={form.catatan} onChange={(event) => change('catatan', event.target.value)} placeholder="Opsional" />
        </div>
      </div>
      {showPengeluaran && (
        <PengeluaranForm value={form.pengeluaran} onChange={(pengeluaran) => change('pengeluaran', pengeluaran)} />
      )}
      <Button type="submit" variant={keluarga ? 'success' : 'primary'}>
        {keluarga ? <Save size={18} /> : <Plus size={18} />} {keluarga ? 'Simpan' : 'Tambah keluarga'}
      </Button>
    </form>
  );
}
