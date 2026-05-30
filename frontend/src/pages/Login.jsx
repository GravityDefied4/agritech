import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/users/login', { email, password: pass });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      nav('/dashboard');
    } catch (err) { alert(err.response?.data?.message || 'Login failed'); }
  };
  return (
    <div className="container"><div className="card" style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <form onSubmit={submit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} required />
        <button className="btn" style={{ width: '100%' }}>Login</button>
      </form>
      <p style={{ marginTop: 15 }}>No account? <Link to="/register">Register</Link></p>
    </div></div>
  );
}