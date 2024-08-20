const express = require("express");
const { Sorteo } = require("./models");
const router = express.Router();

router.post("/crear-sorteo", async (req, res) => {
  const { nombre, cantidad_numeros, fecha } = req.body;

  try {
    // Crear un nuevo sorteo con los datos del formulario
    const nuevoSorteo = await Sorteo.create({
      nombre,
      cantidad_numeros,
      fecha,
    });

    // Redirigir o enviar una respuesta
    res.redirect("/"); // Redirige a la página de inicio o a donde desees
  } catch (error) {
    console.error("Error al crear el sorteo:", error);
    res.status(500).send("Hubo un error al crear el sorteo.");
  }
});

module.exports = router;
