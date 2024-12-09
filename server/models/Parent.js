'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Parent extends Model {
        static associate(models) {
            Parent.belongsToMany(models.NouveauNe, { through: models.NouveauNeParent });
        }
    }
    Parent.init({
        nom: DataTypes.STRING,
        prenom: DataTypes.STRING,
        adresse: DataTypes.TEXT,
        telephone: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Parent',
        tableName: 'Parent'
    });
    return Parent;
};
