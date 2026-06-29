import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Search } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const user = useSelector((state) => state.auth.user);
  const desa = useSelector((state) => state.desa.items.filter((item) => item.ownerUid === user.uid));
  const rt = useSelector((state) => state.rt.items);
  const keluarga = useSelector((state) => state.keluarga.items);
  const myRt = useMemo(() => rt.filter((item) => desa.some((d) => d.id === item.desaId)), [desa, rt]);
  const myKeluarga = useMemo(() => keluarga.filter((item) => item.ownerUid === user.uid), [keluarga, user.uid]);
  const searchResults = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return [];

    return myKeluarga
      .map((item) => {
        const rtItem = rt.find((rtData) => rtData.id === item.rtId);
        const desaItem = desa.find((desaData) => desaData.id === rtItem?.desaId);
        return { ...item, rt: rtItem, desa: desaItem };
      })
      .filter((item) =>
        [item.nama, item.alamat, item.petugas, item.rt?.nomor, item.desa?.nama]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(keyword))
      )
      .slice(0, 12);
  }, [desa, myKeluarga, query, rt]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="page-title">Dashboard</h1>
        <Link to="/dashboard/desa"><Button><Plus size={18} /> Desa</Button></Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-slate-500">Desa saya</p><p className="text-3xl font-black">{desa.length}</p></Card>
        <Card><p className="text-sm text-slate-500">RT</p><p className="text-3xl font-black">{myRt.length}</p></Card>
        <Card><p className="text-sm text-slate-500">Keluarga</p><p className="text-3xl font-black">{myKeluarga.length}</p></Card>
      </div>
      <Card>
        <label className="mb-2 flex items-center gap-2"><Search size={18} /> Cari data saya</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama keluarga, alamat, desa, RT/RW, atau petugas"
        />
        {query.trim() && (
          <div className="mt-4 grid gap-2">
            {searchResults.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded border border-slate-200 p-3 dark:border-slate-800">
                <div>
                  <p className="font-bold">{item.nama}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Desa {item.desa?.nama || '-'} | RT/RW {item.rt?.nomor || '-'} | {item.alamat || 'Alamat belum diisi'}
                  </p>
                </div>
                {item.rt?.id && (
                  <Link to={`/dashboard/keluarga/${item.rt.id}`}><Button variant="soft">Buka</Button></Link>
                )}
              </div>
            ))}
            {!searchResults.length && <p className="text-sm text-slate-500 dark:text-slate-400">Tidak ada data yang cocok.</p>}
          </div>
        )}
      </Card>
      <div className="grid gap-3">
        {desa.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">{item.nama}</h2>
                <p className="text-sm text-slate-500">{rt.filter((r) => r.desaId === item.id).length} RT</p>
              </div>
              <Link to={`/dashboard/rt/${item.id}`}><Button variant="soft">Kelola RT</Button></Link>
            </div>
          </Card>
        ))}
        {!desa.length && <Card>Tambahkan desa pertama untuk mulai mendata.</Card>}
      </div>
    </div>
  );
}
