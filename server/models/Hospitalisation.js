'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Hospitalisation extends Model {
        static associate(models) {
            Hospitalisation.belongsTo(models.NouveauNe, { foreignKey: 'NouveauNeId' });
            Hospitalisation.belongsTo(models.Personnel, { foreignKey: 'PersonnelId' });
        }
    }
    Hospitalisation.init({
        date_admission: DataTypes.DATE,
        date_sortie: DataTypes.DATE,
        raison_admission: DataTypes.TEXT,
        traitement: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Hospitalisation',
        tableName: 'Hospitalisation'
    });
    return Hospitalisation;
};
