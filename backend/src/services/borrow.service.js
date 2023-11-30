const BaseService = require('./base.service');
let borrowRepository = null;

class BorrowService extends BaseService {
    constructor({ BorrowRepository }) {
        super(BorrowRepository);
        borrowRepository = BorrowRepository;
    }

    async getBorrows() {
        return await borrowRepository.getBorrows();
    }


    async getBorrow(id) {
        return await borrowRepository.getBorrow(id);
    }

    async createBorrow(borrow) {
        return await borrowRepository.createBorrow(borrow);
    }

    async updateBorrow(id, borrow) {
        return await borrowRepository.updateBorrow(id, borrow);
    }

    async deleteBorrow(id) {
        return await borrowRepository.deleteBorrow(id);
    }
}

module.exports = BorrowService;