import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import desaReducer from './desaSlice.js';
import rtReducer from './rtSlice.js';
import keluargaReducer from './keluargaSlice.js';
import pengeluaranReducer from './pengeluaranSlice.js';
import uiReducer from './uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    desa: desaReducer,
    rt: rtReducer,
    keluarga: keluargaReducer,
    pengeluaran: pengeluaranReducer,
    ui: uiReducer
  }
});
