const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Equipment = sequelize.define('Equipment', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.TEXT,
        allowNull: false,
    },
    consumables: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    spare_parts: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    installation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    warranty: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    training: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    norms: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    accessories: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Other fields
});

module.exports = Equipment;