const { Router } = require('express');

module.exports = function ({ BorrowController }) {
    const router = Router();

    router.get('/get', BorrowController.getBorrows)
    router.get('/get/:id', BorrowController.getBorrow)
    router.post('/create', BorrowController.createBorrow)
    router.put('/update/:id', BorrowController.updateBorrow)
    router.delete('/delete/:id', BorrowController.deleteBorrow)

    return router;
}