import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  ownerUid: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      if (!state.ownerUid && action.payload?.uid) {
        state.ownerUid = action.payload.uid;
      }
    },
    clearUser(state) {
      state.user = null;
      state.ownerUid = '';
    },
    setOwnerUid(state, action) {
      state.ownerUid = action.payload;
    }
  }
});

export const { setUser, clearUser, setOwnerUid } = authSlice.actions;
export const selectIsOwner = (state) => Boolean(state.auth.user?.uid && state.auth.user.uid === state.auth.ownerUid);
export default authSlice.reducer;
