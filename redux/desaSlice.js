import { createSlice, nanoid } from '@reduxjs/toolkit';

const desaSlice = createSlice({
  name: 'desa',
  initialState: { items: [], selectedId: '' },
  reducers: {
    setDesa(state, action) {
      state.items = action.payload;
    },
    addDesa: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(nama, user) {
        return {
          payload: {
            id: nanoid(),
            nama,
            ownerUid: user.uid,
            petugas: user.nama,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updatedBy: user.uid
          }
        };
      }
    },
    updateDesa(state, action) {
      const item = state.items.find((desa) => desa.id === action.payload.id);
      if (item) Object.assign(item, action.payload, { updatedAt: new Date().toISOString() });
    },
    deleteDesa(state, action) {
      state.items = state.items.filter((desa) => desa.id !== action.payload);
    },
    selectDesa(state, action) {
      state.selectedId = action.payload;
    }
  }
});

export const { setDesa, addDesa, updateDesa, deleteDesa, selectDesa } = desaSlice.actions;
export default desaSlice.reducer;
