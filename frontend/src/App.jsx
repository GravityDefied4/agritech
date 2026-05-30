import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmManager from './pages/FarmManager';
import CropManager from './pages/CropManager';
import Resources from './pages/Resources';
import Weather from './pages/Weather';
import Admin from './pages/Admin';

const Protected = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" />;

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/farms" element={<Protected><FarmManager /></Protected>} />
        <Route path="/crops" element={<Protected><CropManager /></Protected>} />
        <Route path="/resources" element={<Protected><Resources /></Protected>} />
        <Route path="/weather" element={<Protected><Weather /></Protected>} />
        <Route path="/admin" element={<Protected><Admin /></Protected>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}