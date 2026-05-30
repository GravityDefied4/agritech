import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.clear(); navigate('/login'); };
  return (
    <nav className="navbar">
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Agri-Tech</div>
      <div>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/farms">Farms</Link>
            <Link to="/crops">Crops</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/weather">Weather</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}
      </div>
    </nav>
  );
}