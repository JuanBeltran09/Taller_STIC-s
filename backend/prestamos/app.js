require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const prestamosRoutes = require('./prestamos-routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/prestamos', prestamosRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log('🟢 Servicio Préstamos en puerto 3000'));
  })
  .catch(err => console.error(err));
