'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const feedbackModel = new schema({
    usuarioId: { type: schema.Types.ObjectId, ref: 'Usuario' },
     usuarioSignal: { type: String, required: true },
     nome: { type: String, trim: true },
     feed: { type: String, trim: true },

    
});

feedbackModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataPedido)
        this.dataPedido = agora;
    next();
});

module.exports = mongoose.model('Feedback', feedbackModel);