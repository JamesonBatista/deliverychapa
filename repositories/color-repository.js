require('../models/color-model');
const base = require('../bin/base/repository-base');

class colorRepository {

    constructor() {
        this._base = new base('Color');
    }

    async create(data) {
        return await this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async getAll() {
        return await this._base._model.find();
    }
    
    async getById(id) {
        return await this._base.getById(id);
    }

    async delete(id) {
        return await this._base.delete(id);
    }


}

module.exports = colorRepository;
