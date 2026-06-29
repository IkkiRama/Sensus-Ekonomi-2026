export default function SearchFilters({ filters, onChange, desa = [], rt = [] }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <input placeholder="Cari nama" value={filters.q} onChange={(event) => onChange('q', event.target.value)} />
      <select value={filters.desaId} onChange={(event) => onChange('desaId', event.target.value)}>
        <option value="">Semua desa</option>
        {desa.map((item) => (
          <option key={item.id} value={item.id}>{item.nama}</option>
        ))}
      </select>
      <select value={filters.rtId} onChange={(event) => onChange('rtId', event.target.value)}>
        <option value="">Semua RT</option>
        {rt.map((item) => (
          <option key={item.id} value={item.id}>RT/RW {item.nomor}</option>
        ))}
      </select>
      <input placeholder="Petugas" value={filters.petugas} onChange={(event) => onChange('petugas', event.target.value)} />
    </div>
  );
}
