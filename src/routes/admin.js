// src/routes/admin.js
const express = require('express');
const router = express.Router();
const Users = require('../models/users'); // Asegúrate de que la ruta sea correcta
const Personas = require('../models/Persona');
const Tachado = require('../models/Tachado');
const Rifa = require('../models/Rifa');
const { Op } = require('sequelize');


// Página de inicio de sesión
router.get('/login', (req, res) => {
  res.render('admin-login'); // Vista para el login del administrador
});

// Procesar el inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username, password } });
    if (user) {
      req.session.isAdmin = true; // Establece la propiedad isAdmin en la sesión

      // Obtener los números tachados y construir el mapa
      const numeros = await Rifa.findAll();
      const tachados = await Tachado.findAll({
        include: [Personas]
      });

      const tachadoMap = tachados.reduce((map, tachado) => {
        if (!map[tachado.numero]) {
          map[tachado.numero] = [];
        }
        map[tachado.numero].push({
          nombre: tachado.Persona.nombre,
          telefono: tachado.Persona.telefono
        });
        return map;
      }, {});

      res.render('index', { numeros, tachadoMap, isAdmin: true });
    } else {
      res.redirect('/admin/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/admin/login');
  }
});
router.get('/search', async (req, res) => {
  const { nombre } = req.query;

  try {
    const personas = await Personas.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    res.json(personas);
  } catch (error) {
    console.error('Error al buscar personas:', error);
    res.status(500).json({ error: 'Error al buscar personas' });
  }
});
router.get('/personas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await Personas.findByPk(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener persona:', error);
    res.status(500).json({ error: 'Error al obtener persona' });
  }
});

router.get('/form', (req, res) => {
    const numeros = req.query.numeros;
    res.render('admin-dashboard', { numeros });
  });

router.post('/persona', async (req, res) => {

    const { nombre, telefono, numeros, isAdmin } = req.body; 
    const numerosArray = numeros.split(',').map(Number); // Convertir a array de números
    try {
      // Crear la persona
      const persona = await Personas.create({ nombre, telefono });
  
      // Crear los registros de números tachados
      const tachados = numerosArray.map(numero => ({ numero, persona_id: persona.personas_id }));
      await Tachado.bulkCreate(tachados);
  
      // Actualizar el estado de los números en la tabla Rifa
      await Rifa.update({ estado: 'tachado' }, {
        where: {
          numero: numerosArray
        }
      });
  
      alert('Persona y números tachados registrados correctamente');

       res.render('index', { isAdmin: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al registrar persona y números tachados');
    }
  });


module.exports = router;
