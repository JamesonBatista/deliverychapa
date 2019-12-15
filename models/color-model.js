'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const colorModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
     usuarioSignal: { type: String, required: true },
     usuarioInfo: { type: String, trim: true },
    
});

colorModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Color', colorModel);