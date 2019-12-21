'use strict'

const repository = require('../repositories/feedback-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function feedbackController() {

}

feedbackController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
     _validationContract.isValid(req.body.usuarioSignal, 'User Signal');
    _validationContract.isValid(req.body.nome, 'usuario Info');
    _validationContract.isValid(req.body.feed, 'usuario Info');


    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};

feedbackController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
    res.status(200).send(result);
};

feedbackController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
feedbackController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};
feedbackController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isValid(req.body.usuarioSignal, 'User Signal');
    _validationContract.isValid(req.body.nome, 'usuario Info');
    _validationContract.isValid(req.body.feed, 'usuario Info');

    ctrlBase.put(_repo, _validationContract, req, res);
};


module.exports = feedbackController;