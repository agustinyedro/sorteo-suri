const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {  // Cambiado de 'Rifa' a 'Users'
  id_usuario: { // Añadido id_usuario como clave primaria
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true, // Opcional: garantiza que el nombre de usuario sea único
    allowNull: false // Opcional: asegura que el nombre de usuario no sea nulo
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false // Opcional: asegura que la contraseña no sea nula
  }
}, {
  timestamps: false, // Desactiva las columnas createdAt y updatedAt
  tableName: 'users' // Asegura que el nombre de la tabla sea 'users'
});

module.exports = Users;