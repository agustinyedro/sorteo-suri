// src/models/Sorteo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sorteo = sequelize.define(
  "Sorteo",
  {
    sorteo_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad_numeros: {
      type: DataTypes.INTEGER,
      allowNull: false, // Define la cantidad de números en el sorteo
    },
    fecha: {
      type: DataTypes.DATEONLY, // Almacena solo la fecha, sin la hora
      allowNull: false, // Asegura que la fecha no sea nula
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Sorteo;
