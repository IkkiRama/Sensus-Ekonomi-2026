import { toNumber } from './rupiah.js';

export const defaultPengeluaran = {
  listrik: '',
  pulsa: '',
  berasLauk: '',
  jajanRokok: '',
  sabun: '',
  jimpitan: '',
  servisMotor: '',
  air: '',
  spp: '',
  arisan: '',
  cicilan: '',
  gas: '',
  pbb: '',
  pajakMotor: '',
  agustus: '',
  rekreasi: '',
  beliBaju: '',
  zakat: '',
  kurban: ''
};

export function hitungPengeluaran(data) {
  const makanMingguan = toNumber(data.berasLauk) + toNumber(data.jajanRokok);
  const makanBulanan = makanMingguan * 4;
  const nonMakanBulanan =
    toNumber(data.listrik) +
    toNumber(data.pulsa) +
    toNumber(data.sabun) +
    toNumber(data.jimpitan) +
    toNumber(data.servisMotor) +
    toNumber(data.air) +
    toNumber(data.spp) +
    toNumber(data.arisan) +
    toNumber(data.cicilan) +
    toNumber(data.gas);
  const nonMakanTahunan =
    nonMakanBulanan * 12 +
    toNumber(data.pbb) +
    toNumber(data.pajakMotor) +
    toNumber(data.agustus) +
    toNumber(data.rekreasi) +
    toNumber(data.beliBaju) +
    toNumber(data.zakat) +
    toNumber(data.kurban);

  return { makanMingguan, makanBulanan, nonMakanBulanan, nonMakanTahunan };
}
