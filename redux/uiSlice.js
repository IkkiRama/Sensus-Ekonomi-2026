import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: false,
    toast: null,
    loading: false
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { toggleDarkMode, showToast, clearToast, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
