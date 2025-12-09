require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmgr';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
