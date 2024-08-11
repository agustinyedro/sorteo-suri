// src/routes/rifa.js
const express = require('express');
const router = express.Router();
const Rifa = require('../models/Rifa');

// Suponiendo que tienes un middleware de autenticación
router.get('/', (req, res) => {
  // Verifica si el usuario es admin en tu sesión
  const isAdmin = req.session.isAdmin;

  // Obtener números de rifa
  Rifa.findAll().then(numeros => {
    res.render('index', { numeros, isAdmin });
  }).catch(error => {
    console.error('Error al obtener números:', error);
    res.status(500).send('Error en el servidor');
  });
});
// Actualizar el estado de un número
router.post('/tachar/:numero', async (req, res) => {
  const { numero } = req.params;
  await Rifa.update({ estado: 'tachado' }, { where: { numero } });
  res.redirect('/');
});

module.exports = router;
