const { Rifa } = require("../models");

async function realizarSorteo(sorteoId, cantidadGanadores, cantidadSuplentes) {
  try {
    const numerosDisponibles = await Rifa.findAll({
      where: {
        sorteo_id: sorteoId,
        estado: "disponible",
        ganador: false,
      },
    });

    if (numerosDisponibles.length < cantidadGanadores + cantidadSuplentes) {
      throw new Error(
        "No hay suficientes números disponibles para seleccionar ganadores y suplentes."
      );
    }

    const ganadores = [];
    const suplentes = [];

    // Seleccionar ganadores
    for (let i = 0; i < cantidadGanadores; i++) {
      const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
      const ganador = numerosDisponibles.splice(randomIndex, 1)[0];
      ganador.orden_ganador = i + 1; // Asigna el orden del ganador
      ganadores.push(ganador);
    }

    // Seleccionar suplentes
    for (let i = 0; i < cantidadSuplentes; i++) {
      const randomIndex = Math.floor(Math.random() * numerosDisponibles.length);
      const suplente = numerosDisponibles.splice(randomIndex, 1)[0];
      suplente.orden_ganador = null; // No se asigna orden de ganador
      suplente.orden_suplente = i + 1; // Asigna el orden del suplente
      suplentes.push(suplente);
    }

    // Actualizar ganadores en la base de datos
    for (const ganador of ganadores) {
      await ganador.update({
        ganador: true,
        orden_ganador: ganador.orden_ganador,
      });
    }

    // Actualizar suplentes en la base de datos
    for (const suplente of suplentes) {
      await suplente.update({
        ganador: false,
        orden_suplente: suplente.orden_suplente,
      });
    }

    console.log(
      `Ganadores seleccionados para el sorteo ${sorteoId}:`,
      ganadores.map((g) => `Número ${g.numero} (Orden: ${g.orden_ganador})`)
    );
    console.log(
      `Suplentes seleccionados para el sorteo ${sorteoId}:`,
      suplentes.map(
        (s) => `Número ${s.numero} (Orden de Suplente: ${s.orden_suplente})`
      )
    );
  } catch (error) {
    console.error("Error al realizar el sorteo:", error);
  }
}

module.exports = { realizarSorteo };
