const BaseRepository = require('./base.repository');
let borrow = null;

class BorrowRepository extends BaseRepository{
    constructor ({ BorrowModel }){
        super(BorrowModel);
        borrow = BorrowModel;
    }

    async getBorrows(){
        return await borrow.findAll();
    }
}

module.exports = BorrowRepository;