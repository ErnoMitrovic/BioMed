const BorrowModel = require('./borrow');
const EquipmentModel = require('./equipment');

BorrowModel.belongsTo(EquipmentModel, { foreignKey: 'equipment_id', allowNull: false });
EquipmentModel.hasMany(BorrowModel, { foreignKey: 'equipment_id' });

module.exports = {
  BorrowModel,
  EquipmentModel,
};
