'use strict'

const repository = require('../repositories/color-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function colorController() {

}

colorController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
     _validationContract.isValid(req.body.color, 'Color');
    _validationContract.isValid(req.body.usuarioInfo, 'usuario Info');

    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};

colorController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
   console.log(result)

    res.status(200).send(result);
};

colorController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
colorController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};
colorController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isValid(req.body.color, 'Color');
    _validationContract.isValid(req.body.usuarioInfo, 'usuario Info');

    ctrlBase.put(_repo, _validationContract, req, res);
};


module.exports = colorController;