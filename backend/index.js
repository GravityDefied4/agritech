require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/farms', require('./routes/farmRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) return res.status(500).json({ message: 'API key missing' });
  let url = city 
    ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  try {
    const data = await fetch(url).then(r => r.json());
    res.json(data);
  } catch { res.status(500).json({ message: 'Weather fetch failed' }); }
});

app.listen(process.env.PORT || 8000, () => console.log('Backend running on port 8000'));
// Global error handler (must have 4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid ID format' });
  res.status(500).json({ message: 'Internal server error' });
});