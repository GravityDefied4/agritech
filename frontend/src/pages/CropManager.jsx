import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CropManager() {
  const [crops, setCrops] = useState([]);
  const [farms, setFarms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', sowingDate: '', estimatedHarvestDate: '', farm: '', status: 'planted' });

  const load = async () => {
    const [c, f] = await Promise.all([api.get('/crops'), api.get('/farms')]);
    setCrops(c.data); 
    setFarms(f.data);
    if(f.data.length && !form.farm) setForm({...form, farm: f.data[0]._id});
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/crops', form);
    setForm({ name: '', sowingDate: '', estimatedHarvestDate: '', farm: farms[0]?._id || '', status: 'planted' });
    setShowForm(false);
    load();
  };

  const handleStatusChange = async (cropId, newStatus) => {
    try {
      await api.put(`/crops/${cropId}/status`, { status: newStatus });
      load();
    } catch { alert('Failed to update status'); }
  };

  return (
    <div className="container">
      <h2>Crop Tracking</h2>
      
      <button className="btn" onClick={() => setShowForm(!showForm)} style={{ margin: '20px 0' }}>
        {showForm ? '✕ Cancel' : '+ Add Crop'}
      </button>

      {showForm && (
        <div className="card" style={{ marginBottom: 20 }}>
          <h3>New Crop Details</h3>
          <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <input className="input" placeholder="Crop Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required />
            <input className="input" type="date" placeholder="Sowing Date" value={form.sowingDate} onChange={e=>setForm({...form, sowingDate: e.target.value})} required />
            <input className="input" type="date" placeholder="Estimated Harvest Date" value={form.estimatedHarvestDate} onChange={e=>setForm({...form, estimatedHarvestDate: e.target.value})} required />
            <select className="input" value={form.farm} onChange={e=>setForm({...form, farm: e.target.value})} required>
              <option value="">Select Farm</option>
              {farms.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
            </select>
            <button className="btn" style={{ gridColumn: 'span 2' }}>Add Crop</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Crop Name</th>
            <th>Sowing Date</th>
            <th>Est. Harvest</th>
            <th>Farm</th>
            <th>Growth Stage</th>
          </tr>
        </thead>
        <tbody>
          {crops.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{new Date(c.sowingDate).toLocaleDateString()}</td>
              <td>{new Date(c.estimatedHarvestDate).toLocaleDateString()}</td>
              <td>{c.farm?.name || '-'}</td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  style={{
                    padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc',
                    background: c.status === 'harvested' ? '#e8f5e9' : c.status === 'ready' ? '#fff3cd' : '#f8f9fa'
                  }}
                >
                  <option value="planted"> Planted</option>
                  <option value="growing">🌿 Growing</option>
                  <option value="flowering">🌸 Flowering</option>
                  <option value="maturing">🌾 Maturing</option>
                  <option value="ready">✅ Ready</option>
                  <option value="harvested">📦 Harvested</option>
                </select>
              </td>
            </tr>
          ))}
          {crops.length === 0 && <tr><td colSpan="5" style={{textAlign:'center', padding:'20px', color:'#666'}}>No crops tracked yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}