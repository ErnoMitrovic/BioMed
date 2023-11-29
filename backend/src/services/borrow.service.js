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

    async getBorrowsByPattern(pattern) {
        return await borrowRepository.getBorrowsByPattern(pattern);
    }
}

module.exports = BorrowService;