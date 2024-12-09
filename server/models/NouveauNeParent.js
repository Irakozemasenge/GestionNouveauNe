'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NouveauNeParent extends Model {
        static associate(models) { }
    }
    NouveauNeParent.init({
        relation: DataTypes.ENUM('Mère', 'Père', 'Tuteur')
    }, {
        sequelize,
        modelName: 'NouveauNeParent',
        tableName: 'NouveauNeParent'
    });
    return NouveauNeParent;
};
