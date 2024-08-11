const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rifa = sequelize.define('Rifa', {
  numero: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM('disponible', 'tachado'),
    defaultValue: 'disponible'
  }
}, {
  timestamps: false // Desactiva las columnas createdAt y updatedAt
});

module.exports = Rifa;

