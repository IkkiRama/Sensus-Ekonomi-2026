import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../redux/uiSlice.js';

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => dispatch(clearToast()), 2500);
    return () => clearTimeout(timeout);
  }, [dispatch, toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg dark:bg-white dark:text-slate-950">
      {toast}
    </div>
  );
}
