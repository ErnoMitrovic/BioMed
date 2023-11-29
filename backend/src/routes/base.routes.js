const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares");

module.exports = function ({
    BorrowRoutes,
    EquipmentRoutes,
}) {
    const router = express.Router();
    const apiRoutes = express.Router();
    
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    apiRoutes.use("/borrow", BorrowRoutes);
    apiRoutes.use("/equipment", EquipmentRoutes);

    router.use("/api", apiRoutes);

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}