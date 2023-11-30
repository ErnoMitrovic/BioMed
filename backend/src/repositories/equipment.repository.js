const { Op } = require('sequelize');
const BaseRepository = require('./base.repository');
let equipment = null;

class EquipmentRepository extends BaseRepository{
    constructor ({ EquipmentModel }){    
        super(EquipmentModel);
        equipment = EquipmentModel;
    }

    async getEquipments(){
        return await equipment.findAll({
            limit: 10
        });
    }

    async getEquipmentsByPattern(pattern){
        return await equipment.findAll({
            where: {
                name: {
                    [Op.like]: `%${pattern}%`
                }
            },
            limit: 10
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
        return await super.create(equipment);
    }

    async updateEquipment(id, equipment){
        return await super.update(id, equipment);
    }

    async deleteEquipment(id){
        return await super.delete(id);
    }
}

module.exports = EquipmentRepository;