const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Usuario = require('./src/models/Usuario');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

async function crearUsuario() {
  try {
    const existe = await Usuario.findOne({ email: 'mireina@correo.com' });
    if (existe) {
      console.log('El usuario ya existe');
      process.exit();
    }

    const usuario = new Usuario({
      nombre: 'mireina',
      email: 'mireina',
      password: 'mireina123'
    });

    await usuario.save();
    console.log('Usuario creado correctamente');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

crearUsuario();