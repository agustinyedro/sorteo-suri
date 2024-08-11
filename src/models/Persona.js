// src/models/Personas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Personas = sequelize.define('Personas', {
  personas_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Personas;
