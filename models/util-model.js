'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const utilModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
     comentIntro: { type: String, required: true },
     deliveryApp: { type: String, trim: true },
     msgonOff: { type: String, trim: true },
     foto: { type: String, trim: true },   
    taxaEntrega: {type: String, trim: true},
    fotoIcon: {type: String, trim: true},
    nomeIcon: {type: String, trim: true}


    
});

utilModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Util', utilModel);