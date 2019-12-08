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
     _validationContract.isRequired(req.body.deliveryApp, 'Método de entrega');
    // _validationContract.isRequired(req.body.produtos, 'Informe o produto');
    // _validationContract.isRequired(req.body.quantidade, 'Informe a quantidade');
    // _validationContract.isValid(req.body.onesignalId, 'O oneSignal é obrigatório'
    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};

utilController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
   console.log(result)

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
     _validationContract.isRequired(req.body.deliveryApp, 'Método de entrega');
    // _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    // _validationContract.isRequired(req.body.adress, 'Informe seu Endereço completo!');
    // _validationContract.isRequired(req.body.bairr, 'Informe seu Bairro!');
    // _validationContract.isRequired(req.body.city, 'Informe sua Cidade!');




    // _validationContract.isRequired(req.params.id, 'Informe o Id do usuário que será editado');

    // let usuarioIsEmailExiste = await _repo.IsEmailExite(req.body.email);
    // if (usuarioIsEmailExiste) {
    //     _validationContract.isTrue(
    //         (usuarioIsEmailExiste.nome != undefined) &&
    //         (usuarioIsEmailExiste._id != req.params.id),
    //         `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    // }
    ctrlBase.put(_repo, _validationContract, req, res);
};


module.exports = utilController;