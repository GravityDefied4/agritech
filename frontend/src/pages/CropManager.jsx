import { useEffect, useState } from 'react';
import api from '../services/api';
export default function CropManager() {
  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', sowingDate: '', farm: '' });
  const load = async () => {
    const [c, f] = await Promise.all([api.get('/crops'), api.get('/farms')]);
    setCrops(c.data); setFarms(f.data);
    if(f.data.length) setForm({...form, farm: f.data[0]._id});
  };
  useEffect(() => { load(); }, []);
  const submit = async (e) => { e.preventDefault(); await api.post('/crops', form); load(); };
  return (
    <div className="container">
      <h2>Crop Tracking</h2>
      <div className="card" style={{ marginTop: 20 }}>
        <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <input className="input" placeholder="Crop Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
          <input className="input" placeholder="Type" value={form.type} onChange={e=>setForm({...form, type: e.target.value})} />
          <input className="input" type="date" value={form.sowingDate} onChange={e=>setForm({...form, sowingDate: e.target.value})} />
          <select className="input" value={form.farm} onChange={e=>setForm({...form, farm: e.target.value})}>
            {farms.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
          <button className="btn" style={{ gridColumn: 'span 2' }}>Add Crop</button>
        </form>
      </div>
      <table><thead><tr><th>Crop</th><th>Type</th><th>Sowing</th><th>Farm</th><th>Status</th></tr></thead>
      <tbody>{crops.map(c => <tr key={c._id}><td>{c.name}</td><td>{c.type}</td><td>{new Date(c.sowingDate).toLocaleDateString()}</td><td>{c.farm?.name}</td><td>{c.status}</td></tr>)}</tbody></table>
    </div>
  );
}