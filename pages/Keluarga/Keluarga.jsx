import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PenBox, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import KeluargaForm from '../../components/keluarga/KeluargaForm.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { deleteKeluarga } from '../../redux/keluargaSlice.js';
import { formatRupiah } from '../../utils/rupiah.js';
import { hitungPengeluaran } from '../../utils/pengeluaran.js';
import { confirmDelete } from '../../utils/confirmDelete.js';
import { removeItem } from '../../services/firestoreService.js';

export default function Keluarga() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [pengeluaranId, setPengeluaranId] = useState('');
  const [query, setQuery] = useState('');
  const user = useSelector((state) => state.auth.user);
  const rt = useSelector((state) => state.rt.items.find((item) => item.id === id));
  const keluarga = useSelector((state) =>
    state.keluarga.items
      .filter((item) => item.rtId === id)
      .filter((item) => {
        const keyword = query.trim().toLowerCase();
        if (!keyword) return true;
        return [item.nama, item.alamat, item.catatan, item.petugas]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword));
      })
  );

  return (
    <div className="space-y-5">
      <h1 className="page-title">Keluarga RT/RW {rt?.nomor || '-'}</h1>
      <Card>
        <KeluargaForm rtId={id} keluarga={editing} onDone={() => setEditing(null)} />
      </Card>
      <Card>
        <label>Cari keluarga di RT/RW ini</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama, alamat, catatan, atau petugas"
        />
      </Card>
      <div className="grid gap-3">
        {keluarga.map((item) => {
          const hasil = hitungPengeluaran(item.pengeluaran || {});
          return (
            <Card key={item.id}>
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="font-bold">{item.nama}</h2>
                  <p className="text-sm text-slate-500">{item.alamat || '-'} | Petugas {item.petugas}</p>
                  <p className="mt-2 text-sm font-semibold">Makan mingguan {formatRupiah(hasil.makanMingguan)}</p>
                  <p className="text-sm font-semibold">Makan bulanan {formatRupiah(hasil.makanBulanan)}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="warning" onClick={() => setPengeluaranId(pengeluaranId === item.id ? '' : item.id)}><PenBox size={18} />Edit Pengeluaran</Button>
                  {/* <Button variant="soft" onClick={() => setEditing(item)}><Pencil size={18} /> Edit Keluarga</Button> */}
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (!confirmDelete(`keluarga ${item.nama}`)) return;
                      dispatch(deleteKeluarga(item.id));
                      removeItem(user.uid, 'keluarga', item.id).catch(() => {});
                    }}
                  >
                    <Trash2 size={18} /> Hapus
                  </Button>
                </div>
              </div>
              {pengeluaranId === item.id && (
                <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <KeluargaForm rtId={id} keluarga={item} onDone={() => setPengeluaranId('')} showPengeluaran />
                </div>
              )}
            </Card>
          );
        })}
        {!keluarga.length && <Card>Tidak ada keluarga yang cocok.</Card>}
      </div>
    </div>
  );
}
