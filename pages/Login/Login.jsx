import { Navigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { LogIn } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleProvider } from '../../firebase/config.js';
import { showToast } from '../../redux/uiSlice.js';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';

export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (user) return <Navigate to="/dashboard" replace />;

  async function login() {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(showToast('Login berhasil'));
    } catch (error) {
      dispatch(showToast(error.message));
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <h1 className="page-title">Login</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Masuk dengan akun Google untuk mengelola data milik sendiri.</p>
        <Button className="mt-5 w-full" onClick={login}><LogIn size={18} /> Login Google</Button>
      </Card>
    </div>
  );
}
