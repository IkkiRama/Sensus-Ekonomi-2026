import { createSlice } from '@reduxjs/toolkit';
import { defaultPengeluaran } from '../utils/pengeluaran.js';

const pengeluaranSlice = createSlice({
  name: 'pengeluaran',
  initialState: defaultPengeluaran,
  reducers: {
    setField(state, action) {
      state[action.payload.name] = action.payload.value;
    },
    setPengeluaran(_state, action) {
      return { ...defaultPengeluaran, ...action.payload };
    },
    resetPengeluaran() {
      return defaultPengeluaran;
    }
  }
});

export const { setField, setPengeluaran, resetPengeluaran } = pengeluaranSlice.actions;
export default pengeluaranSlice.reducer;
