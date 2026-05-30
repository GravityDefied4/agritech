import { useState } from 'react';
import api from '../services/api';
export default function Weather() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    if (!city) return;
    setLoading(true);
    try { setData((await api.get(`/weather?city=${city}`)).data); } catch { alert('City not found'); }
    setLoading(false);
  };
  return (
    <div className="container">
      <h2>Weather Forecast</h2>
      <div className="card" style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <input className="input" style={{ marginBottom: 0, flex: 1 }} placeholder="Enter city" value={city} onChange={e=>setCity(e.target.value)} onKeyDown={e=>e.key==='Enter'&&fetch()} />
        <button className="btn" onClick={fetch} disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
      </div>
      {data && (
        <div className="card" style={{ marginTop: 20 }}>
          <h3>{data.name}, {data.sys.country}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginTop: 15 }}>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather" width="64" />
            <div><p style={{ fontSize: 28, fontWeight: 'bold' }}>{Math.round(data.main.temp)}°C</p><p style={{ textTransform: 'capitalize' }}>{data.weather[0].description}</p></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, marginTop: 15 }}>
            <div><strong>Humidity</strong><br/>{data.main.humidity}%</div>
            <div><strong>Wind</strong><br/>{data.wind.speed} m/s</div>
            <div><strong>Pressure</strong><br/>{data.main.pressure} hPa</div>
          </div>
        </div>
      )}
    </div>
  );
}