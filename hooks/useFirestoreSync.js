import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDesa } from '../redux/desaSlice.js';
import { setRt } from '../redux/rtSlice.js';
import { setKeluarga } from '../redux/keluargaSlice.js';
import { loadUserData, saveUserData } from '../services/firestoreService.js';
import { hasAnyStoredData, serverEmptyKey } from './syncKeys.js';

export function useFirestoreSync() {
  const dispatch = useDispatch();
  const location = useLocation();
  const loadedUid = useRef('');
  const isHydrating = useRef(false);
  const hasSeenData = useRef(false);
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => ({
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

    if (sessionStorage.getItem(serverEmptyKey(user.uid)) === '1') {
      loadedUid.current = user.uid;
      isHydrating.current = false;
      return undefined;
    }

    loadUserData(user.uid)
      .then((cloudData) => {
        if (!active) return;
        if (!hasAnyStoredData(cloudData)) return;
        hasSeenData.current = true;
        dispatch(setDesa(cloudData.desa));
        dispatch(setRt(cloudData.rt));
        dispatch(setKeluarga(cloudData.keluarga));
      })
      .catch(() => {
        // Local mode remains available when Firebase env/firestore rules are not ready.
      })
      .finally(() => {
        if (active) loadedUid.current = user.uid;
        isHydrating.current = false;
      });

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

    const timeout = setTimeout(() => {
      saveUserData(user.uid, data).catch(() => {});
    }, 700);

    return () => clearTimeout(timeout);
  }, [data, user?.uid]);
}
