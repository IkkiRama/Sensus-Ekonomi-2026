import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api.js';
import { showToast } from '../redux/uiSlice.js';
import { auth } from '../firebase/config.js';

export function useBackupApi() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => ({
    user: state.auth.user,
    desa: state.desa.items,
    rt: state.rt.items,
    keluarga: state.keluarga.items
  }));

  const saveBackup = useCallback(async () => {
    if (!user) return;
    const token = await auth.currentUser?.getIdToken();
    if (!token) {
      dispatch(showToast('Token Firebase belum tersedia'));
      return;
    }
    await api.saveBackup(token, data);
    dispatch(showToast('Backup server tersimpan'));
  }, [data, dispatch, user]);

  return { saveBackup };
}
