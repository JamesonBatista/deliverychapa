'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    adress: { type: String, required: true, trim: true},
    city: { type: String, required: true, trim: true},
    bairr: { type: String, required: true, trim: true},
    email: { type: String, required: true },
    telefone: { type: String, required: false },
    senha: { type: String, required: true },
    foto: { type: String },
    ativo: { type: Boolean, required: true, default: true },
    dataCriacao: { type: Date, default: Date.now }
}, { versionKey: false });

usuarioModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});

module.exports = mongoose.model('Usuario', usuarioModel);