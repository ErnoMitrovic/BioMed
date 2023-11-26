const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Borrow = sequelize.define('Borrow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    distributor_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    distributor_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiving_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Borrow;