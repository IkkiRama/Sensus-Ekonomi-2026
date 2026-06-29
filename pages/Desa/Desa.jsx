import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DesaForm from '../../components/desa/DesaForm.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { deleteDesa } from '../../redux/desaSlice.js';
import { deleteRt } from '../../redux/rtSlice.js';
import { deleteKeluarga } from '../../redux/keluargaSlice.js';
import { confirmDelete } from '../../utils/confirmDelete.js';
import { removeItem } from '../../services/firestoreService.js';

export default function Desa() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const desa = useSelector((state) => state.desa.items.filter((item) => item.ownerUid === user.uid));
  const rt = useSelector((state) => state.rt.items);
  const keluarga = useSelector((state) => state.keluarga.items);

  function removeDesa(item) {
    if (!confirmDelete(`desa ${item.nama} beserta RT dan keluarga di dalamnya`)) return;
    const rtIds = rt.filter((rtItem) => rtItem.desaId === item.id).map((rtItem) => rtItem.id);
    keluarga.filter((keluargaItem) => rtIds.includes(keluargaItem.rtId)).forEach((keluargaItem) => {
      dispatch(deleteKeluarga(keluargaItem.id));
      removeItem(user.uid, 'keluarga', keluargaItem.id).catch(() => {});
    });
    rtIds.forEach((rtId) => {
      dispatch(deleteRt(rtId));
      removeItem(user.uid, 'rt', rtId).catch(() => {});
    });
    dispatch(deleteDesa(item.id));
    removeItem(user.uid, 'desa', item.id).catch(() => {});
  }

  return (
    <div className="space-y-4">
      <h1 className="page-title">CRUD Desa</h1>
      <DesaForm />
      <div className="grid gap-3">
        {desa.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="font-bold">{item.nama}</h2><p className="text-sm text-slate-500">Petugas {item.petugas}</p></div>
              <div className="flex gap-2">
                <Link to={`/dashboard/rt/${item.id}`}><Button variant="soft">RT</Button></Link>
                <Button
                  variant="danger"
                  onClick={() => removeDesa(item)}
                >
                  <Trash2 size={18} /> Hapus
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
