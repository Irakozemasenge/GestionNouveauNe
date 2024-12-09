'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NouveauNe extends Model {
        static associate(models) {
            NouveauNe.belongsToMany(models.Parent, { through: models.NouveauNeParent });
            NouveauNe.hasMany(models.Hospitalisation, { foreignKey: 'NouveauNeId' });
            NouveauNe.hasMany(models.Vaccination, { foreignKey: 'NouveauNeId' });
            NouveauNe.hasMany(models.UsageMedicament, { foreignKey: 'NouveauNeId' });
            NouveauNe.hasMany(models.Consultation, { foreignKey: 'NouveauNeId' });
        }
    }
    NouveauNe.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        date_naissance: DataTypes.DATE,
        sexe: DataTypes.ENUM('M', 'F'),
        poids_naissance: DataTypes.DECIMAL(10, 2),
        taille_naissance: DataTypes.DECIMAL(10, 2),
        groupe_sanguin: DataTypes.ENUM('A', 'B', 'AB', 'O'),
        rhesus: DataTypes.ENUM('+', '-'),
        observations: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'NouveauNe',
        tableName: 'NouveauNe'
    });
    return NouveauNe;
};
