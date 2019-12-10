'use strict'

const repository = require('../repositories/pedido-repository');
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');
const _repo = new repository();

function pedidoController() {

}

pedidoController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.itens, 'Informe os itens do seu pedido');
    _validationContract.isRequired(req.body.valorTotal, 'O valor Total é obrigatório');
    _validationContract.isRequired(req.body.nomeUser, 'O nome do Usuario é obrigatório');
    _validationContract.isRequired(req.body.produtos, 'Informe o produto');
    _validationContract.isRequired(req.body.quantidade, 'Informe a quantidade');
    _validationContract.isValid(req.body.onesignalId, 'O oneSignal é obrigatório');
    _validationContract.isValid(req.body.deliveryApp, 'O Modo de entrega é obrigatório');
    _validationContract.isValid(req.body.color, 'color');







    
    req.body.usuarioId = req.usuarioLogado.user._id;
    ctrlBase.post(_repo, _validationContract, req, res);
};
pedidoController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    // _validationContract.isRequired(req.body.itens, 'Informe os itens do seu pedido');
    // _validationContract.isRequired(req.body.valorTotal, 'O valor Total é obrigatório');
    // _validationContract.isRequired(req.body.nomeUser, 'O nome do Usuario é obrigatório');
    // _validationContract.isRequired(req.body.produtos, 'Informe o produto');
    // _validationContract.isRequired(req.body.quantidade, 'Informe a quantidade');
    // _validationContract.isValid(req.body.onesignalId, 'O oneSignal é obrigatório');
    // _validationContract.isValid(req.body.deliveryApp, 'O Modo de entrega é obrigatório');
    _validationContract.isValid(req.body.color, 'color');

   
    
    ctrlBase.put(_repo, _validationContract, req, res);
};

pedidoController.prototype.get = async (req, res) => {
    let result = await _repo.getAll(req.usuarioLogado.user._id);
   console.log(result)

    res.status(200).send(result);
};

pedidoController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
pedidoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

module.exports = pedidoController;