require('../models/pedido-model-user');
const base = require('../bin/base/repository-base');

class pedidoRepositoryUser {

    constructor() {
        this._base = new base('PedidoUser');
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
        return await this._base.getById(id, 'valorTotal _id dataPedido');
    }

    async delete(id) {
        return await this._base.delete(id);
    }


}

module.exports = pedidoRepositoryUser;
