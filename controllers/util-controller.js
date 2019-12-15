'use strict'

const repository = require('../repositories/util-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function utilController() {

}

utilController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.taxaEntrega, 'Taxa Entrega');
     _validationContract.isRequired(req.body.comentIntro, 'Comentário introdução');
     _validationContract.isValid(req.body.deliveryApp, 'Método de entrega');
    _validationContract.isValid(req.body.msgonOff, 'Informe sua mensagem de ONLINE/OFFLINE');
    _validationContract.isValid(req.body.foto, 'Foto Wallpapers');
    _validationContract.isValid(req.body.fotoIcon, 'Foto Icon');
    _validationContract.isValid(req.body.nomeIcon, 'Foto Icon nome');


    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};

utilController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);

    res.status(200).send(result);
};

utilController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
utilController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};
utilController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.taxaEntrega, 'Informe sua taxa');
    _validationContract.isRequired(req.body.comentIntro, 'Comentário introdução');
     _validationContract.isValid(req.body.deliveryApp, 'Método de entrega');
    _validationContract.isValid(req.body.msgonOff, 'Informe sua mensagem de ONLINE/OFFLINE');
    _validationContract.isValid(req.body.foto, 'Foto Wallpapers');
    _validationContract.isValid(req.body.fotoIcon, 'Foto Icon');
    _validationContract.isValid(req.body.nomeIcon, 'Foto Icon nome');

    ctrlBase.put(_repo, _validationContract, req, res);
};


module.exports = utilController;