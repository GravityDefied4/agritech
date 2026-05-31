import { useEffect, useState } from 'react';
import api from '../services/api';

export default function FarmManager() {
  const [farms, setFarms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', size: '', location: '', primaryCropType: '' });

  const load = async () => setFarms((await api.get('/farms')).data);
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/farms', form);
    setForm({ name: '', size: '', location: '', primaryCropType: '' });
    setShowForm(false);
    load();
  };

  return (
    <div className="container">
      <h2>Farm Management</h2>
      
      <button className="btn" onClick={() => setShowForm(!showForm)} style={{ margin: '20px 0' }}>
        {showForm ? ' Cancel' : '+ Add Farm'}
      </button>

      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <h3>New Farm Details</h3>
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <input className="input" placeholder="Farm Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
            <input className="input" type="number" placeholder="Size (acres)" value={form.size} onChange={e=>setForm({...form, size: e.target.value})} required />
            <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} required />
            <input className="input" placeholder="Primary Crop Type" value={form.primaryCropType} onChange={e=>setForm({...form, primaryCropType: e.target.value})} required />
            <button className="btn" style={{ gridColumn: 'span 2' }}>Save Farm</button>
          </form>
        </div>
      )}

      <table>
        <thead><tr><th>Name</th><th>Size</th><th>Location</th><th>Primary Crop</th></tr></thead>
        <tbody>
          {farms.map(f => (
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{f.size} acres</td>
              <td>{f.location || '-'}</td>
              <td>{f.primaryCropType || '-'}</td>
            </tr>
          ))}
          {farms.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'20px', color:'#666'}}>No farms added yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}