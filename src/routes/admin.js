// src/routes/admin.js
const express = require("express");
const router = express.Router();
const Users = require("../models/users"); // Asegúrate de que la ruta sea correcta
const Personas = require("../models/Persona");
const Tachado = require("../models/Tachado");
const Rifa = require("../models/Rifa");
const Sorteo = require("../models/Sorteo");
const { Op } = require("sequelize");

// Página de inicio de sesión
router.get("/login", (req, res) => {
  res.render("admin-login"); // Vista para el login del administrador
});

// Procesar el inicio de sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username, password } });
    if (user) {
      req.session.isAdmin = true; // Establece la propiedad isAdmin en la sesión

      // Obtener los números tachados y construir el mapa
      const sorteos = await Sorteo.findAll();
      console.log(sorteos);
      const numeros = await Rifa.findAll();
      const tachados = await Tachado.findAll({
        include: [Personas],
      });

      const tachadoMap = tachados.reduce((map, tachado) => {
        if (!map[tachado.numero]) {
          map[tachado.numero] = [];
        }
        map[tachado.numero].push({
          nombre: tachado.Persona.nombre,
          telefono: tachado.Persona.telefono,
        });
        return map;
      }, {});

      res.render("admin-dashboard", {
        numeros,
        tachadoMap,
        isAdmin: true,
        sorteos,
      });
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/admin/login");
  }
});

router.get("/search", async (req, res) => {
  const { nombre } = req.query;

  try {
    const personas = await Personas.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`,
        },
      },
    });

    res.json(personas);
  } catch (error) {
    console.error("Error al buscar personas:", error);
    res.status(500).json({ error: "Error al buscar personas" });
  }
});

router.get("/personas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const persona = await Personas.findByPk(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ error: "Persona no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener persona:", error);
    res.status(500).json({ error: "Error al obtener persona" });
  }
});

router.get("/form", (req, res) => {
  const numeros = req.query.numeros;
  res.render("admin-dashboard", { numeros });
});

router.post("/persona", async (req, res) => {
  const { nombre, telefono, numeros, isAdmin } = req.body;
  const numerosArray = numeros.split(",").map(Number); // Convertir a array de números
  try {
    // Crear la persona
    const persona = await Personas.create({ nombre, telefono });

    // Crear los registros de números tachados
    const tachados = numerosArray.map((numero) => ({
      numero,
      persona_id: persona.personas_id,
    }));
    await Tachado.bulkCreate(tachados);

    // Actualizar el estado de los números en la tabla Rifa
    await Rifa.update(
      { estado: "tachado" },
      {
        where: {
          numero: numerosArray,
        },
      }
    );

    alert("Persona y números tachados registrados correctamente");

    res.render("index", { isAdmin: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar persona y números tachados");
  }
});

router.post("/crear-sorteo", async (req, res) => {
  const { nombre, cantidad_numeros, fecha } = req.body;

  try {
    const nuevoSorteo = await Sorteo.create({
      nombre,
      cantidad_numeros,
      fecha,
    });

    const numeros = [];
    for (let i = 1; i <= cantidad_numeros; i++) {
      numeros.push({
        numero: i,
        estado: "disponible",
        sorteo_id: nuevoSorteo.sorteo_id,
      });
    }
    await Rifa.bulkCreate(numeros);

    res.render("admin-dashboard", {
      message: "Sorteo creado y números generados exitosamente.",
      isCreate: false,
    });
  } catch (error) {
    console.error("Error al crear el sorteo y generar números:", error);
    res.render("admin-dashboard", {
      message: "Hubo un error al crear el sorteo. Inténtalo nuevamente.",
      isCreate: true,
    });
  }
});

module.exports = router;
