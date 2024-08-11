// src/models/Tachado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personas = require('./Persona');

const Tachado = sequelize.define('Tachado', {
  tachado_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  persona_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Personas,
      key: 'personas_id'
    },
    allowNull: false
  }
}, {
  timestamps: false
});

// Definir las asociaciones
Tachado.belongsTo(Personas, { foreignKey: 'persona_id' });
Personas.hasMany(Tachado, { foreignKey: 'persona_id' });

module.exports = Tachado;
