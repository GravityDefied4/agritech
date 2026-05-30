import { useEffect, useState } from 'react';
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
        <div className="card"><h3>Total Farms</h3><p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 10 }}>{stats.farms}</p></div>
        <div className="card"><h3>Active Crops</h3><p style={{ fontSize: 32, fontWeight: 'bold', marginTop: 10 }}>{stats.crops}</p></div>
        <div className="card"><h3>Quick Actions</h3><ul style={{ marginTop: 10, paddingLeft: 20 }}><li>Add new farm</li><li>Track crop health</li><li>Check weather forecasts</li></ul></div>
      </div>
    </div>
  );
}