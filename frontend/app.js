const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('🟢 Frontend disponible en http://localhost:3000');
});
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.use((err, req, res, next) => {
  console.error('⚠️ Error del servidor:', err.message);
  res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});
// Manejo de errores 404 y 500