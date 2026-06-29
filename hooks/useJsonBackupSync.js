import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase/config.js';
import { api } from '../services/api.js';
import { setDesa } from '../redux/desaSlice.js';
import { setRt } from '../redux/rtSlice.js';
import { setKeluarga } from '../redux/keluargaSlice.js';
import { hasAnyStoredData, LOCAL_DATA_KEY, serverEmptyKey } from './syncKeys.js';

export function useJsonBackupSync() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loadedUid = useRef('');
  const isHydrating = useRef(false);
  const hasSeenData = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => ({
    user: state.auth.user,
    desa: state.desa.items,
    rt: state.rt.items,
    keluarga: state.keluarga.items
  }));

  useEffect(() => {
    if (!user?.uid) {
      loadedUid.current = '';
      hasSeenData.current = false;
      return undefined;
    }

    let active = true;
    isHydrating.current = true;

    async function loadBackup() {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;
        const backup = await api.getBackup(token);
        if (!active) return;
        hasSeenData.current = hasAnyStoredData(backup);
        if (hasSeenData.current) {
          sessionStorage.removeItem(serverEmptyKey(user.uid));
        } else {
          sessionStorage.setItem(serverEmptyKey(user.uid), '1');
          localStorage.removeItem(LOCAL_DATA_KEY);
        }
        dispatch(setDesa(backup.desa || []));
        dispatch(setRt(backup.rt || []));
        dispatch(setKeluarga(backup.keluarga || []));
      } catch {
        // Server backup is optional during local setup; localStorage remains the fallback.
      } finally {
        if (active) {
          loadedUid.current = user.uid;
          isHydrating.current = false;
        }
      }
    }

    loadBackup();

    return () => {
      active = false;
    };
  }, [dispatch, location.pathname, user?.uid]);

  useEffect(() => {
    if (hasAnyStoredData(data)) {
      hasSeenData.current = true;
      if (user?.uid) sessionStorage.removeItem(serverEmptyKey(user.uid));
    }
    if (!user?.uid || loadedUid.current !== user.uid || isHydrating.current) return undefined;
    if (!hasAnyStoredData(data) && !hasSeenData.current) return undefined;

    const timeout = setTimeout(async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;
        await api.saveBackup(token, data);
      } catch {
        // Keep editing smooth; localStorage still protects the latest client state.
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [data, user?.uid]);
}
