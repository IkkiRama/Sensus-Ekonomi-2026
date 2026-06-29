import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Database, LineChart, Phone, ShieldCheck, UserRound } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';

export default function Home() {
  const steps = [
    ['1', 'Buat Desa', 'Mulai dari wilayah kerja dan petugas pendata.'],
    ['2', 'Tambah RT/RW', 'Simpan pasangan RT/RW seperti 3/9 agar relasinya jelas.'],
    ['3', 'Input Keluarga', 'Data keluarga dibuat dulu, pengeluaran bisa dilengkapi setelahnya.'],
    ['4', 'Cek Hasil', 'Semua data bisa dilihat, difilter, dan dirinci di halaman Data.']
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-lg bg-white p-6 shadow-sm md:grid-cols-[1.35fr_1fr] dark:bg-slate-900">
        <div>
          <p className="text-sm font-bold uppercase text-primary">Pendataan sosial ekonomi</p>
          <h1 className="mt-3 text-4xl font-black tracking-normal text-slate-950 dark:text-white">SE2026</h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Aplikasi pendataan desa, RT/RW, keluarga, dan pengeluaran rumah tangga. Dibuat untuk alur kerja lapangan yang cepat: input keluarga dulu, lengkapi pengeluaran, lalu cek rekapnya kapan saja.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/dashboard"><Button>Mulai input <ArrowRight size={18} /></Button></Link>
            <Link to="/data"><Button variant="soft">Lihat data</Button></Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['Realtime', 'Search dan filter langsung terasa.'],
              ['Backup', 'JSON server dan Firestore.'],
              ['Mobile', 'Nyaman dipakai dari HP.']
            ].map(([title, text]) => (
              <div key={title} className="rounded border border-slate-200 p-3 dark:border-slate-800">
                <p className="font-bold text-slate-950 dark:text-white">{title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3">
          {[
            ['CRUD Bertingkat', 'Desa, RT/RW, dan keluarga tersusun rapi.'],
            ['Hitung Otomatis', 'Makan mingguan, bulanan, non makan, dan tahunan.'],
            ['Backup', 'Data user dapat dipulihkan dari server JSON.']
          ].map(([title, text]) => (
            <div key={title} className="flex gap-3 rounded border border-slate-200 p-3 dark:border-slate-800">
              <CheckCircle2 className="text-success" size={22} />
              <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><Database className="text-primary" /><h2 className="mt-3 font-bold">Data semua user</h2><p className="text-sm text-slate-500">Halaman data bersifat baca saja untuk non-owner.</p></Card>
        <Card><ShieldCheck className="text-success" /><h2 className="mt-3 font-bold">Hak akses owner</h2><p className="text-sm text-slate-500">CRUD dibatasi ke pemilik data.</p></Card>
        <Card><CheckCircle2 className="text-primary" /><h2 className="mt-3 font-bold">PWA</h2><p className="text-sm text-slate-500">Siap di-build dan di-install di Android.</p></Card>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        {steps.map(([number, title, text]) => (
          <Card key={number}>
            <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-50 text-sm font-black text-primary dark:bg-blue-950">{number}</div>
            <h2 className="mt-3 font-bold">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{text}</p>
          </Card>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-[1fr_1fr]">
        <Card>
          <LineChart className="text-success" />
          <h2 className="mt-3 text-lg font-bold">Rekap yang langsung berguna</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Setiap keluarga punya rincian pengeluaran dan total otomatis. Hasil bisa disalin sebagai angka Rupiah saja untuk laporan cepat.
          </p>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-100 dark:bg-slate-800">
              <UserRound className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Dibuat oleh Rifki</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Website ini dibuat oleh aku untuk membantu pendataan SE2026.</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                <a className="rounded bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100" href="https://instagram.com/george_ikki" target="_blank" rel="noreferrer">@george_ikki</a>
                <a className="inline-flex items-center gap-2 rounded bg-green-50 px-3 py-2 text-green-800 hover:bg-green-100 dark:bg-green-950 dark:text-green-100" href="https://wa.me/6282133320489" target="_blank" rel="noreferrer"><Phone size={16} /> 082133320489</a>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
