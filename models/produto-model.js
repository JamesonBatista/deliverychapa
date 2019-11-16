'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const produtoModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String, required: true },
    comentario: { type: String, trim: true },
    preco: { type: Number, required: true, default: 0 },
    foto: { type: String, required: true },
    ativo: { type: Boolean, required: true, default: true },
    categoriaId: { type: schema.Types.ObjectId, ref: 'Categoria' },
    dataCriacao: { type: Date, default: Date.now },
    produtos: { type: String, trim: true },
    quantidade: { type: String, trim: true },

    
}, { versionKey: false });

produtoModel.pre('save', next => {
    let agora = new Date();
    if (!this.dataCriacao)
        this.dataCriacao = agora;
    next();
});

module.exports = mongoose.model('Produto', produtoModel);