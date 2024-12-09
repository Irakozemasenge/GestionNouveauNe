'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Personnel extends Model {
        static associate(models) {
            Personnel.hasMany(models.Hospitalisation, { foreignKey: 'PersonnelId' });
            Personnel.hasMany(models.Vaccination, { foreignKey: 'PersonnelId' });
            Personnel.hasMany(models.UsageMedicament, { foreignKey: 'PersonnelId' });
            Personnel.hasMany(models.Consultation, { foreignKey: 'PersonnelId' });
        }
    }
    Personnel.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        role: DataTypes.ENUM('Médecin', 'Infirmier', 'Administratif'),
        telephone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.TEXT,
        photo: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Personnel',
        tableName: 'Personnel'
    });
    return Personnel;
};
