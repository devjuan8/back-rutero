const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Crear instancia de Express
const app = express();

// Middlewares
const corsOptions = {
  origin: [
    'https://rutero-lizeth.vercel.app', // producción
    'http://localhost:5173',                  // desarrollo local
  ],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

app.use(express.json()); // Para parsear JSON en los requests

app.get('/', (req, res) => {
  res.send('Backend funcionando en Vercel 🚀');
});

// Rutas básicas de prueba
app.use('/api/v1/clientes', require('./src/routes/clienteRoutes'));
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/ruta', require('./src/routes/rutaRoutes'));

const protegerRuta = require('./src/middlewares/authMiddleware');
app.get('/api/v1/dashboard', protegerRuta, (req, res) => {
  res.json({ mensaje: `Bienvenido ${req.usuario.nombre} al dashboard` });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
