const BaseService = require('./base.service');
let equipmentRepository = null;

class EquipmentService extends BaseService {
    constructor({ EquipmentRepository }) {
        super(EquipmentRepository);
        equipmentRepository = EquipmentRepository;
    }

    async getEquipments() {
        return await equipmentRepository.getEquipments();
    }

    async getEquipmentsByPattern(pattern) {
        return await equipmentRepository.getEquipmentsByPattern(pattern);
    }

    async countEquipments() {
        return await equipmentRepository.countEquipments();
    }

    async countEquipmentsByPattern(pattern) {
        return await equipmentRepository.countEquipmentsByPattern(pattern);
    }

    async getEquipment(id) {
        return await equipmentRepository.getEquipment(id);
    }

    async createEquipment(equipment) {
        return await equipmentRepository.createEquipment(equipment);
    }

    async updateEquipment(id, equipment) {
        return await equipmentRepository.updateEquipment(id, equipment);
    }

    async deleteEquipment(id) {
        return await equipmentRepository.deleteEquipment(id);
    }
}

module.exports = EquipmentService;