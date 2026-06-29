import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDesa } from '../redux/desaSlice.js';
import { setRt } from '../redux/rtSlice.js';
import { setKeluarga } from '../redux/keluargaSlice.js';
import { hasAnyStoredData, LOCAL_DATA_KEY } from './syncKeys.js';

export function useLocalPersistence() {
  const dispatch = useDispatch();
  const skippedInitialPersist = useRef(false);
  const data = useSelector((state) => ({
    desa: state.desa.items,
    rt: state.rt.items,
    keluarga: state.keluarga.items
  }));

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_DATA_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      dispatch(setDesa(parsed.desa || []));
      dispatch(setRt(parsed.rt || []));
      dispatch(setKeluarga(parsed.keluarga || []));
    } catch {
      localStorage.removeItem(LOCAL_DATA_KEY);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!skippedInitialPersist.current) {
      skippedInitialPersist.current = true;
      return;
    }
    if (!hasAnyStoredData(data)) {
      localStorage.removeItem(LOCAL_DATA_KEY);
      return;
    }
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
  }, [data]);
}
