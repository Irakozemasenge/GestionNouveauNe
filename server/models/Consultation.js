"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    static associate(models) {
      Consultation.belongsTo(models.NouveauNe, { foreignKey: "NouveauNeId" });
      Consultation.belongsTo(models.Personnel, { foreignKey: "PersonnelId" });
    }
  }
  Consultation.init(
    {
      date_consultation: DataTypes.DATE,
      raison_consultation: DataTypes.TEXT,
      diagnostic: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Consultation",
      tableName: "Consultation",
    }
  );
  return Consultation;
};
