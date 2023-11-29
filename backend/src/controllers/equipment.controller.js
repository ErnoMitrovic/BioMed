let equipmentService = null;

class EquipmentController {
    constructor ({ EquipmentService }) {
        equipmentService = EquipmentService;
    }

    async getEquipments (req, res) {
        const equipments = await equipmentService.getEquipments();
        return res.send(equipments);
    }

    async getEquipmentsByPattern (req, res) {
        const { pattern } = req.params;
        const equipments = await equipmentService.getEquipmentsByPattern(pattern);
        return res.send(equipments);
    }

    async createEquipment (req, res) {
        const equipment = await equipmentService.createEquipment(req.body);
        return res.send(equipment);
    }

    async updateEquipment (req, res) {
        const { id } = req.params;
        const equipment = await equipmentService.updateEquipment(id, req.body);
        return res.send(equipment);
    }

    async deleteEquipment (req, res) {
        const { id } = req.params;
        const equipment = await equipmentService.deleteEquipment(id);
        return res.send(equipment);
    }

    async countEquipments (req, res) {
        const count = await equipmentService.countEquipments();
        return res.send({ count });
    }

    async countEquipmentsByPattern (req, res) {
        const { pattern } = req.params;
        const count = await equipmentService.countEquipmentsByPattern(pattern);
        return res.send({ count });
    }

    async getEquipment (req, res) {
        const { id } = req.params;
        const equipment = await equipmentService.getEquipment(id);
        return res.send(equipment);
    }

}

module.exports = EquipmentController;