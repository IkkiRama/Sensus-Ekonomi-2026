import { createSlice, nanoid } from '@reduxjs/toolkit';

const rtSlice = createSlice({
  name: 'rt',
  initialState: { items: [] },
  reducers: {
    setRt(state, action) {
      state.items = action.payload;
    },
    addRt: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(desaId, nomor, user) {
        return {
          payload: {
            id: nanoid(),
            desaId,
            nomor,
            ownerUid: user.uid,
            petugas: user.nama,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            updatedBy: user.uid
          }
        };
      }
    },
    updateRt(state, action) {
      const item = state.items.find((rt) => rt.id === action.payload.id);
      if (item) Object.assign(item, action.payload, { updatedAt: new Date().toISOString() });
    },
    deleteRt(state, action) {
      state.items = state.items.filter((rt) => rt.id !== action.payload);
    }
  }
});

export const { setRt, addRt, updateRt, deleteRt } = rtSlice.actions;
export default rtSlice.reducer;
