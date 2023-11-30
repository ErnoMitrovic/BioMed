const Router = require('express').Router;

module.exports = function ({ EquipmentController }) {
    const router = Router();

    router.get('/get', EquipmentController.getEquipments)
    router.get('/get/:id', EquipmentController.getEquipment)
    router.get('/getPattern/:pattern', EquipmentController.getEquipmentsByPattern)
    router.post('/create', EquipmentController.createEquipment)
    router.put('/update/:id', EquipmentController.updateEquipment)
    router.delete('/delete/:id', EquipmentController.deleteEquipment)
    router.get('/count', EquipmentController.countEquipments)
    router.get('/count/:pattern', EquipmentController.countEquipmentsByPattern)

    return router;
}