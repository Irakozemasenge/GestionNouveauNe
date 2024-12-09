"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vaccination extends Model {
    static associate(models) {
      Vaccination.belongsTo(models.NouveauNe, { foreignKey: "NouveauNeId" });
      Vaccination.belongsTo(models.Personnel, { foreignKey: "PersonnelId" });
    }
  }
  Vaccination.init(
    {
      vaccin: DataTypes.STRING,
      date_vaccination: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Vaccination",
      tableName: "Vaccination",
    }
  );
  return Vaccination;
};
