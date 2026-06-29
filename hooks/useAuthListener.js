import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/config.js';
import { setUser, clearUser } from '../redux/authSlice.js';

export function useAuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        dispatch(clearUser());
        return;
      }

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          nama: firebaseUser.displayName,
          email: firebaseUser.email,
          photo: firebaseUser.photoURL
        })
      );
    });
  }, [dispatch]);
}
