let borrowService = null;

class BorrowController {
    constructor ({ BorrowService }) {
        borrowService = BorrowService;
    }

    async getBorrows (req, res) {
        const borrows = await borrowService.getBorrows();
        return res.send(borrows);
    }

    async getBorrow (req, res) {
        const { id } = req.params;
        const borrow = await borrowService.getBorrow(id);
        return res.send(borrow);
    }

    async createBorrow (req, res) {
        const { body } = req;
        const createdBorrow = await borrowService.createBorrow(body);
        return res.status(201).send(createdBorrow);
    }

    async updateBorrow (req, res) {
        const { body } = req;
        const { id } = req.params;
        const updatedBorrow = await borrowService.updateBorrow(id, body);
        return res.send(updatedBorrow);
    }

    async deleteBorrow (req, res) {
        const { id } = req.params;
        const deletedBorrow = await borrowService.deleteBorrow(id);

        if (deletedBorrow) {
            return res.send({ success: true, message: 'Equipment deleted successfully' });
        } else {
            return res.status(404).send({ success: false, message: 'Equipment not found' });
        }
    }
}

module.exports = BorrowController;