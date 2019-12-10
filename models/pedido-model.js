'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pedidoModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
    valorTotal: { type: Number, required: true, default: 0 },
    itens: { type: String, required: true },
    comentario: { type: String, trim: true },
    onesignalId: { type: String, trim: true },
    formaPagamento: { type: String, trim: true},
    comentarioPagamento: {type: String, trim: true},
    dataPedido: { type: Date, default: Date.now },
    nomeUser: { type: String, trim: true },
    produtos: { type: String, trim: true },
    quantidade: { type: String, trim: true },
    deliveryApp: { type: String, trim: true },
    color: { type: Boolean, trim: true },


    
});

pedidoModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Pedido', pedidoModel);