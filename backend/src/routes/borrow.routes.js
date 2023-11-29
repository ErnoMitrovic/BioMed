const { Router } = require('express');

module.exports = function ({ BorrowController }) {
    const router = Router();

    router.get('/get', BorrowController.getBorrows)
    router.get('/get/:pattern', BorrowController.getBorrowsByPattern)

    return router;
}