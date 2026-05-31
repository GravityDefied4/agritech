import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing'; 
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmManager from './pages/FarmManager';
import CropManager from './pages/CropManager';
import Resources from './pages/Resources';
import Weather from './pages/Weather';
import CropInfo from './pages/CropInfo';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import Admin from './pages/Admin';

// Protected Route Component
const Protected = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/login" />;
const AdminOnly = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user?.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  const location = useLocation();
  // Hide Navbar on Landing, Login, and Register pages
  // (Landing has its own nav, Login/Register don't need one)
  const hideNavbar = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Farmer Routes */}
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/farms" element={<Protected><FarmManager /></Protected>} />
        <Route path="/crops" element={<Protected><CropManager /></Protected>} />
        <Route path="/crop-info" element={<Protected><CropInfo /></Protected>} />
        <Route path="/resources" element={<Protected><Resources /></Protected>} />
        <Route path="/my-orders" element={<Protected><MyOrders /></Protected>} />
        <Route path="/weather" element={<Protected><Weather /></Protected>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminOnly><AdminDashboard /></AdminOnly>} />
        <Route path="/admin/users" element={<AdminOnly><AdminUsers /></AdminOnly>} />
        <Route path="/admin/products" element={<AdminOnly><Admin /></AdminOnly>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}