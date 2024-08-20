const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sorteo = require("./Sorteo");

const Rifa = sequelize.define(
  "Rifa",
  {
    numero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.ENUM("disponible", "tachado"),
      defaultValue: "disponible",
    },
    ganador: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    orden_ganador: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    orden_suplente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sorteo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Sorteo,
        key: "sorteo_id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Rifa;
