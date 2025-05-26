require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const aulasRoutes = require('./aulas-routes');
// Usar rutas
app.use('/api/aulas', aulasRoutes);

// Conexión a la base de datos
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => console.log('🟢 Servicio Aulas en puerto 3000'));
  })
  .catch(err => console.error(err));
