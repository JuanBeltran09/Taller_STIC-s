require('dotenv').config();
const express = require('express');
const cors = require('cors');

const estudiantesRoutes = require('./estudiantes-routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);

// Conexión a la base de datos
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log('🟢 Servicio Estudiantes en puerto 3000'));
  })
  .catch(err => console.error(err));
