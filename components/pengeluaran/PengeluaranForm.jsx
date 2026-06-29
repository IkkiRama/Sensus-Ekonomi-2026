import { Copy } from 'lucide-react';
import { useDispatch } from 'react-redux';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import { showToast } from '../../redux/uiSlice.js';
import { formatRupiah, onlyNumber } from '../../utils/rupiah.js';
import { hitungPengeluaran } from '../../utils/pengeluaran.js';

const groups = [
  { title: 'Listrik', fields: [['listrik', 'Rp listrik']] },
  { title: 'Pulsa', fields: [['pulsa', 'Rp pulsa']] },
  { title: 'Makan Mingguan', fields: [['berasLauk', 'Beras + lauk'], ['jajanRokok', 'Jajan + rokok']] },
  {
    title: 'Non Makan Bulanan',
    fields: [
      ['sabun', 'Sabun'],
      ['jimpitan', 'Jimpitan'],
      ['servisMotor', 'Servis motor'],
      ['air', 'Air'],
      ['spp', 'SPP'],
      ['arisan', 'Arisan'],
      ['cicilan', 'Cicilan'],
      ['gas', 'Gas']
    ]
  },
  { title: 'Tahunan', fields: [['pbb', 'PBB'], ['pajakMotor', 'Pajak motor'], ['agustus', '17 Agustus'], ['rekreasi', 'Rekreasi'], ['beliBaju', 'Beli baju'], ['zakat', 'Zakat'], ['kurban', 'Kurban']] }
];

export default function PengeluaranForm({ value, onChange }) {
  const dispatch = useDispatch();
  const hasil = hitungPengeluaran(value);

  function setField(name, rawValue) {
    onChange({ ...value, [name]: onlyNumber(rawValue) });
  }

  async function copy(amount) {
    await navigator.clipboard.writeText(formatRupiah(amount));
    dispatch(showToast('Hasil disalin'));
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <Card key={group.title}>
          <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-white">{group.title}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {group.fields.map(([name, label]) => (
              <div key={name}>
                <label>{label}</label>
                <input inputMode="numeric" value={value[name] ? formatRupiah(value[name]) : ''} onChange={(event) => setField(name, event.target.value)} placeholder="Rp" />
              </div>
            ))}
          </div>
        </Card>
      ))}
      <div className="grid gap-3 md:grid-cols-4">
        {[
          ['Makan Mingguan', hasil.makanMingguan],
          ['Makan Bulanan', hasil.makanBulanan],
          ['Non Makan Bulanan', hasil.nonMakanBulanan],
          ['Non Makan Tahunan', hasil.nonMakanTahunan]
        ].map(([label, amount]) => (
          <Card key={label}>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-black text-slate-950 dark:text-white">{formatRupiah(amount)}</p>
            <Button type="button" variant="soft" className="mt-3" onClick={() => copy(amount)}>
              <Copy size={18} /> Copy
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
