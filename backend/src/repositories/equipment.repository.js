const BaseRepository = require('./base.repository');
let equipment = null;

class EquipmentRepository extends BaseRepository{
    constructor ({ EquipmentModel }){    
        super(EquipmentModel);
        equipment = EquipmentModel;
    }

    async getEquipments(){
        return await equipment.findAll();
    }

    async getEquipmentsByPattern(pattern){
        return await equipment.findAll({
            where: {
                name: {
                    [Op.like]: `%${pattern}%`
                }
            }
        });
    }

    async countEquipments(){
        return await equipment.count();
    }

    async countEquipmentsByPattern(pattern){
        return await equipment.count({
            where: {
                name: {
                    [Op.like]: `%${pattern}%`
                }
            }
        });
    }

    async getEquipment(id){
        return await equipment.findByPk(id);
    }

    async createEquipment(equipment){
        return await equipment.create(equipment);
    }

    async updateEquipment(id, equipment){
        return await equipment.update(equipment, {
            where: {
                id
            }
        });
    }

    async deleteEquipment(id){
        return await equipment.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = EquipmentRepository;