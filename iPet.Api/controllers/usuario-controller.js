'use strict'

const repository = require('../repositories/usuario-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base'); // Utilizando o exports assim, não precisa dar um new paea começar a usar
const _repo = new repository(); // Repositorio com Class precisa dar um new

//Dependencia para a geração do Token
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

function usuarioController(){

}
usuarioController.prototype.post = async (req, res) => {

    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A Senha e a Confirmação não são iguais');

    let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
    if (usuarioIsEmailExiste) {
        _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }

    //Criptografa a senha do usuário
    //req.body.senha = md5(req.body.senha);
   // req.body.senha = req.body.senha;

    ctrlBase.post(_repo, _validationContract, req, res);
};
/*
usuarioController.prototype.post = async (req, res) => {

    let _validationContract = new validation();
    
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais');

    let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
    if (usuarioIsEmailExiste) {
        _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }

    // Criptografa a senha do usuario
    //req.body.senha = md5(req.body.senha);
    req.body.senha = req.body.senha;
    
    ctrlBase.post(_repo, _validationContract, req, res);
}; */
usuarioController.prototype.put = async (req, res) => {
    let _validationContract = new validation();
    
    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.params.id, 'Informe o ID do usuário que será editado');

    let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        _validationContract.isTrue(
            (usuarioIsEmailExiste.nome != undefined) && 
            (usuarioIsEmailExiste._id != req.params.id), 
            `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }
    ctrlBase.put(_repo, _validationContract, req, res);
};
usuarioController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};
usuarioController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};
usuarioController.prototype.delete  = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};
usuarioController.prototype.autenticar = async (req, res) => {

    let _validationContract = new validation();    
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'E-mail informado é invalido');
    _validationContract.isRequired(req.body.senha, 'Informe sua senha');

    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Não foi possível efetuar o login', validation: _validationContract.errors()})
        return;
    }
    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);

    if(usuarioEncontrado){
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign(usuarioEncontrado, variables.Security.secretKey)
        })
    } else {
        res.status(404).send({message: 'Usuário e/ou senha informados são inválidos'});
    }
}
module.exports = usuarioController;