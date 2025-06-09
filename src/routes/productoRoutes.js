const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  crearProducto,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productoController');

// /api/v1/productos
router.get('/', obtenerProductos);
router.post('/', crearProducto);
router.get('/:id', obtenerProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;