'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ligardesligarModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
    // valorTotal: { type: Number, required: true, default: 0 },
     ligardesligar: { type: String, required: true },
    //  deliveryApp: { type: String, trim: true },
    // onesignalId: { type: String, trim: true },
    // formaPagamento: { type: String, trim: true},
    // comentarioPagamento: {type: String, trim: true},
    // dataPedido: { type: Date, default: Date.now },
    // nomeUser: { type: String, trim: true },
    // produtos: { type: String, trim: true },
    // quantidade: { type: String, trim: true },
    // taxaEntrega: {type: String, trim: true}
    
});

ligardesligarModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('LigarDesligar', ligardesligarModel);