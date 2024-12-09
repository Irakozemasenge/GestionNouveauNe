'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UsageMedicament extends Model {
        static associate(models) {
            UsageMedicament.belongsTo(models.NouveauNe, { foreignKey: 'NouveauNeId' });
            UsageMedicament.belongsTo(models.StockMedicament, { foreignKey: 'StockMedicamentId' });
            UsageMedicament.belongsTo(models.Personnel, { foreignKey: 'PersonnelId' });
        }
    }
    UsageMedicament.init({
        quantite_utilisee: DataTypes.INTEGER,
        date_utilisation: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'UsageMedicament',
        tableName: 'UsageMedicament'
    });
    return UsageMedicament;
};
