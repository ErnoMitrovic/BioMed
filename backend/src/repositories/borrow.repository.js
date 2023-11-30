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

    async getBorrow(id){
        return await super.get(id);
    }

    async createBorrow(borrow){
        return await super.create(borrow);
    }

    async updateBorrow(id, borrow){
        return await super.update(id, borrow);
    }

    async deleteBorrow(id){
        return await super.delete(id);
    }
}

module.exports = BorrowRepository;