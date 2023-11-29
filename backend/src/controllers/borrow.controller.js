let borrowService = null;

class BorrowController {
    constructor ({ BorrowService }) {
        borrowService = BorrowService;
    }

    async getBorrows (req, res) {
        const borrows = await borrowService.getBorrows();
        return res.send(borrows);
    }

    async getBorrowsByPattern (req, res) {
        const { pattern } = req.params;
        const borrows = await borrowService.getBorrowsByPattern(pattern);
        return res.send(borrows);
    }
}

module.exports = BorrowController;