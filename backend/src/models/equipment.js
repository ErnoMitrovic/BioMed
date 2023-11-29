const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Equipment = sequelize.define('Equipment', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maintenance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    consumables: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    square_parts: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    installation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    waranty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    training: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    norms: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accesories: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manual: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Otros campos según sea necesario
});

module.exports = Equipment;