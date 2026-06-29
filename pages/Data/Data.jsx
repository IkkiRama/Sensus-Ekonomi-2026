import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchFilters from '../../components/common/SearchFilters.jsx';
import Card from '../../components/ui/Card.jsx';
import { formatRupiah } from '../../utils/rupiah.js';
import { hitungPengeluaran } from '../../utils/pengeluaran.js';
import { loadPublicData } from '../../services/firestoreService.js';

export default function Data() {
  const desa = useSelector((state) => state.desa.items);
  const rt = useSelector((state) => state.rt.items);
  const keluarga = useSelector((state) => state.keluarga.items);
  const [filters, setFilters] = useState({ q: '', desaId: '', rtId: '', petugas: '' });
  const [openId, setOpenId] = useState('');
  const [publicData, setPublicData] = useState(null);

  useEffect(() => {
    let active = true;

    loadPublicData()
      .then((data) => {
        if (!active) return;
        if (data.desa.length || data.rt.length || data.keluarga.length) setPublicData(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const sourceDesa = publicData?.desa || desa;
  const sourceRt = publicData?.rt || rt;
  const sourceKeluarga = publicData?.keluarga || keluarga;

  const rows = useMemo(() => {
    return sourceKeluarga
      .map((item) => {
        const rtItem = sourceRt.find((r) => r.id === item.rtId);
        const desaItem = sourceDesa.find((d) => d.id === rtItem?.desaId);
        return { ...item, rt: rtItem, desa: desaItem };
      })
      .filter((item) => {
        const q = filters.q.toLowerCase();
        return (
          (!q || item.nama.toLowerCase().includes(q)) &&
          (!filters.desaId || item.desa?.id === filters.desaId) &&
          (!filters.rtId || item.rt?.id === filters.rtId) &&
          (!filters.petugas || item.petugas?.toLowerCase().includes(filters.petugas.toLowerCase()))
        );
      });
  }, [sourceDesa, sourceRt, sourceKeluarga, filters]);

  return (
    <div className="space-y-4">
      <h1 className="page-title">Semua Data</h1>
      <SearchFilters filters={filters} onChange={(name, value) => setFilters((current) => ({ ...current, [name]: value }))} desa={sourceDesa} rt={sourceRt} />
      <div className="grid gap-3">
        {rows.map((row) => {
          const hasil = hitungPengeluaran(row.pengeluaran || {});
          const pengeluaran = row.pengeluaran || {};
          const detail = [
            ['Listrik', pengeluaran.listrik],
            ['Pulsa', pengeluaran.pulsa],
            ['Beras + lauk', pengeluaran.berasLauk],
            ['Jajan + rokok', pengeluaran.jajanRokok],
            ['Sabun', pengeluaran.sabun],
            ['Jimpitan', pengeluaran.jimpitan],
            ['Servis motor', pengeluaran.servisMotor],
            ['Air', pengeluaran.air],
            ['SPP', pengeluaran.spp],
            ['Arisan', pengeluaran.arisan],
            ['Cicilan', pengeluaran.cicilan],
            ['Gas', pengeluaran.gas],
            ['PBB', pengeluaran.pbb],
            ['Pajak motor', pengeluaran.pajakMotor],
            ['17 Agustus', pengeluaran.agustus],
            ['Rekreasi', pengeluaran.rekreasi],
            ['Beli baju', pengeluaran.beliBaju],
            ['Zakat', pengeluaran.zakat],
            ['Kurban', pengeluaran.kurban]
          ];
          return (
            <Card key={row.id}>
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-lg font-bold">{row.nama}</h2>
                  <p className="text-sm text-slate-500">Desa {row.desa?.nama || '-'} | RT/RW {row.rt?.nomor || '-'} | Petugas {row.petugas || '-'}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span>Non makan tahunan: {formatRupiah(hasil.nonMakanTahunan)}</span>
                  <button
                    type="button"
                    className="rounded bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
                    onClick={() => setOpenId(openId === row.id ? '' : row.id)}
                  >
                    {openId === row.id ? 'Tutup detail' : 'Lihat detail'}
                  </button>
                </div>
              </div>
              {openId === row.id && (
                <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="grid gap-2 md:grid-cols-3">
                    {detail.map(([label, amount]) => (
                      <div key={label} className="rounded border border-slate-200 p-3 text-sm dark:border-slate-800">
                        <p className="font-semibold text-slate-500 dark:text-slate-400">{label}</p>
                        <p className="mt-1 font-bold text-slate-950 dark:text-white">{formatRupiah(amount || 0)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-4">
                    <div className="rounded bg-slate-100 p-3 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-slate-100">Makan mingguan: {formatRupiah(hasil.makanMingguan)}</div>
                    <div className="rounded bg-blue-50 p-3 text-sm font-bold text-blue-900 dark:bg-blue-950 dark:text-blue-100">Makan bulanan: {formatRupiah(hasil.makanBulanan)}</div>
                    <div className="rounded bg-green-50 p-3 text-sm font-bold text-green-900 dark:bg-green-950 dark:text-green-100">Non makan bulanan: {formatRupiah(hasil.nonMakanBulanan)}</div>
                    <div className="rounded bg-slate-100 p-3 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-slate-100">Non makan tahunan: {formatRupiah(hasil.nonMakanTahunan)}</div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
        {!rows.length && <Card>Belum ada data keluarga.</Card>}
      </div>
    </div>
  );
}
