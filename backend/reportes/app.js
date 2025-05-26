require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const reportesRoutes = require('./reportes-routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/reportes', reportesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log('🟢 Servicio Reportes en puerto 3000'));
  })
  .catch(err => console.error(err));
