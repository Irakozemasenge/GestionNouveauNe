'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StockMedicament extends Model {
        static associate(models) {
            StockMedicament.hasMany(models.UsageMedicament, { foreignKey: 'StockMedicamentId' });
        }
    }
    StockMedicament.init({
        nom_medicament: DataTypes.STRING,
        quantite: DataTypes.INTEGER,
        date_peremption: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'StockMedicament',
        tableName: 'StockMedicament'
    });
    return StockMedicament;
};
