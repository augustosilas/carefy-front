import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreatePatient } from './pages/CreatePatient';
import { EditPatient } from './pages/EditPatient';
import { Login } from './pages/Login'

export function Router() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePatient />} />
      <Route path="/edit" element={<EditPatient />} />
    </Routes>
  );
}
