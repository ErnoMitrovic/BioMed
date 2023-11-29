const { createContainer, asClass, asValue, asFunction } = require('awilix');

const config = require('../config');
const app = require('.');

// Services
const { BorrowService, EquipmentService } = require('../services');

// Controllers
const { BorrowController, EquipmentController } = require('../controllers');

// Routes
const { BorrowRoutes, EquipmentRoutes } = require('../routes/index');
const Routes = require('../routes/base.routes');

// Models
const { BorrowModel, EquipmentModel } = require('../models');

// Repositories
const { BorrowRepository, EquipmentRepository } = require('../repositories');

const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        BorrowService: asClass(BorrowService).singleton(),
        EquipmentService: asClass(EquipmentService).singleton()
    })
    .register({
        BorrowController: asClass(BorrowController.bind(BorrowController)).singleton(),
        EquipmentController: asClass(EquipmentController.bind(EquipmentController)).singleton()
    })
    .register({
        BorrowRoutes: asFunction(BorrowRoutes).singleton(),
        EquipmentRoutes: asFunction(EquipmentRoutes).singleton()
    })
    .register({
        BorrowModel: asValue(BorrowModel),
        EquipmentModel: asValue(EquipmentModel)
    })
    .register({
        BorrowRepository: asClass(BorrowRepository).singleton(),
        EquipmentRepository: asClass(EquipmentRepository).singleton()
    });

module.exports = container;