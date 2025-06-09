const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });

  const esValido = await usuario.compararPassword(password);
  if (!esValido) return res.status(400).json({ error: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};