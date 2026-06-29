import { Link, useParams } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import RtForm from '../../components/rt/RtForm.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { deleteRt } from '../../redux/rtSlice.js';
import { deleteKeluarga } from '../../redux/keluargaSlice.js';
import { confirmDelete } from '../../utils/confirmDelete.js';

export default function RT() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const desa = useSelector((state) => state.desa.items.find((item) => item.id === id));
  const rt = useSelector((state) => state.rt.items.filter((item) => item.desaId === id));
  const keluarga = useSelector((state) => state.keluarga.items);

  function removeRt(item) {
    if (!confirmDelete(`RT/RW ${item.nomor} beserta keluarga di dalamnya`)) return;
    keluarga.filter((keluargaItem) => keluargaItem.rtId === item.id).forEach((keluargaItem) => dispatch(deleteKeluarga(keluargaItem.id)));
    dispatch(deleteRt(item.id));
  }

  return (
    <div className="space-y-4">
      <h1 className="page-title">RT Desa {desa?.nama || '-'}</h1>
      <RtForm desaId={id} />
      <div className="grid gap-3 md:grid-cols-2">
        {rt.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="text-lg font-bold">RT/RW {item.nomor}</h2><p className="text-sm text-slate-500">{keluarga.filter((k) => k.rtId === item.id).length} keluarga</p></div>
              <div className="flex gap-2">
                <Link to={`/dashboard/keluarga/${item.id}`}><Button variant="soft">Keluarga</Button></Link>
                <Button
                  variant="danger"
                  onClick={() => removeRt(item)}
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
