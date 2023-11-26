const sequelize = require('../db');
const BorrowModel = require('./borrow');
const EquipmentModel = require('./equipment');

const Borrow = BorrowModel(sequelize);
const Equipment = EquipmentModel(sequelize);

Borrow.belongsTo(Equipment, { foreignKey: 'equipment_id' });
Equipment.hasMany(Borrow, { foreignKey: 'equipment_id' });

module.exports = {
  Borrow,
  Equipment,
};
