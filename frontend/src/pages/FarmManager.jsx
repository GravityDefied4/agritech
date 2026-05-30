import { useEffect, useState } from 'react';
import api from '../services/api';
export default function FarmManager() {
  const [farms, setFarms] = useState([]);
  const [form, setForm] = useState({ name: '', size: '', location: '', irrigationMethod: '' });
  const load = async () => setFarms((await api.get('/farms')).data);
  useEffect(() => { load(); }, []);
  const submit = async (e) => { e.preventDefault(); await api.post('/farms', form); setForm({ name: '', size: '', location: '', irrigationMethod: '' }); load(); };
  return (
    <div className="container">
      <h2>Farm Management</h2>
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Add New Farm</h3>
        <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input className="input" type="number" placeholder="Size (acres)" value={form.size} onChange={e=>setForm({...form, size: e.target.value})} required />
          <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} />
          <input className="input" placeholder="Irrigation" value={form.irrigationMethod} onChange={e=>setForm({...form, irrigationMethod: e.target.value})} />
          <button className="btn" style={{ gridColumn: 'span 2' }}>Save</button>
        </form>
      </div>
      <table><thead><tr><th>Name</th><th>Size</th><th>Location</th><th>Irrigation</th></tr></thead>
      <tbody>{farms.map(f => <tr key={f._id}><td>{f.name}</td><td>{f.size}</td><td>{f.location||'-'}</td><td>{f.irrigationMethod||'-'}</td></tr>)}</tbody></table>
    </div>
  );
}