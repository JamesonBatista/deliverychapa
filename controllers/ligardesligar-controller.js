'use strict'

const repository = require('../repositories/ligardesligar-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function ligardesligarController() {

}

ligardesligarController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
     _validationContract.isValid(req.body.ligardesligar, 'Método de entrega');
    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};

ligardesligarController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);

    res.status(200).send(result);
};

ligardesligarController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
ligardesligarController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};
ligardesligarController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

     _validationContract.isValid(req.body.ligardesligar, 'Método de entrega');

    ctrlBase.put(_repo, _validationContract, req, res);
};


module.exports = ligardesligarController;