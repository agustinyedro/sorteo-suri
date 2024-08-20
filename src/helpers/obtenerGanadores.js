const { Rifa } = require("../models");

async function obtenerGanadores(sorteoId) {
  try {
    const ganadores = await Rifa.findAll({
      where: {
        sorteo_id: sorteoId,
        ganador: true,
      },
      order: [["orden_ganador", "ASC"]], // Ordena por el orden de ganador
    });

    return ganadores;
  } catch (error) {
    console.error("Error al obtener los ganadores:", error);
    throw error;
  }
}

module.exports = { obtenerGanadores };
