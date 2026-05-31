import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import api from '../services/api';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [stats, setStats] = useState({ farms: 0, crops: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [f, c] = await Promise.all([api.get('/farms'), api.get('/crops')]);
        setStats({ farms: f.data.length, crops: c.data.length });
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: 20 }}>Welcome, {user?.name}</h1>
      
      <div className="grid">
        {/* Stat Card 1 */}
        <div className="card">
          <h3>Total Farms</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 10 }}>{stats.farms}</p>
        </div>

        {/* Stat Card 2 */}
        <div className="card">
          <h3>Active Crops</h3>
          <p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 10 }}>{stats.crops}</p>
        </div>

        {/* Quick Actions - NOW CLICKABLE */}
        <div className="card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            <Link 
              to="/farms" 
              className="btn" 
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Add New Farm
            </Link>
            
            <Link 
              to="/crops" 
              className="btn" 
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Track Crop Health
            </Link>

            <Link 
              to="/weather" 
              className="btn" 
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Check Weather
            </Link>
            
            <Link 
              to="/resources" 
              className="btn" 
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Buy Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}