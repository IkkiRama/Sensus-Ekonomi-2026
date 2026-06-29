import { Route, Routes } from 'react-router-dom';
import { useAuthListener } from './hooks/useAuthListener.js';
import { useFirestoreSync } from './hooks/useFirestoreSync.js';
import AppLayout from './components/layout/AppLayout.jsx';
import PrivateRoute from './components/common/PrivateRoute.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Data from './pages/Data/Data.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Desa from './pages/Desa/Desa.jsx';
import RT from './pages/RT/RT.jsx';
import Keluarga from './pages/Keluarga/Keluarga.jsx';
import Profile from './pages/Profile/Profile.jsx';

export default function App() {
  useAuthListener();
  useFirestoreSync();

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/data" element={<Data />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard/desa" element={<PrivateRoute><Desa /></PrivateRoute>} />
        <Route path="/dashboard/rt/:id" element={<PrivateRoute><RT /></PrivateRoute>} />
        <Route path="/dashboard/keluarga/:id" element={<PrivateRoute><Keluarga /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}
