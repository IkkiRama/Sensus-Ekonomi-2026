import { createSlice, nanoid } from '@reduxjs/toolkit';
import { defaultPengeluaran } from '../utils/pengeluaran.js';

const keluargaSlice = createSlice({
  name: 'keluarga',
  initialState: { items: [] },
  reducers: {
    setKeluarga(state, action) {
      state.items = action.payload;
    },
    addKeluarga: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(rtId, data, user) {
        return {
          payload: {
            id: nanoid(),
            rtId,
            nama: data.nama,
            alamat: data.alamat || '',
            catatan: data.catatan || '',
            pengeluaran: data.pengeluaran || defaultPengeluaran,
            ownerUid: user.uid,
            petugas: user.nama,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updatedBy: user.uid
          }
        };
      }
    },
    updateKeluarga(state, action) {
      const item = state.items.find((keluarga) => keluarga.id === action.payload.id);
      if (item) Object.assign(item, action.payload, { updatedAt: new Date().toISOString() });
    },
    deleteKeluarga(state, action) {
      state.items = state.items.filter((keluarga) => keluarga.id !== action.payload);
    }
  }
});

export const { setKeluarga, addKeluarga, updateKeluarga, deleteKeluarga } = keluargaSlice.actions;
export default keluargaSlice.reducer;
