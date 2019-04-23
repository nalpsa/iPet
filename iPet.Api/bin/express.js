const express = require('express');
const bodyParser = require('body-parser'); // carinha que faz a conversao do body para json
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');

//Routers
const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');
const usuarioRouter = require('../routes/usuario-router');

//Criando/Invocando a API/Server Web do Express
const app = express();
//Configuracao de parse do JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Configurando a conexao com o banco de dados mongoDB
mongoose.connect(variables.Database.connection, {useNewUrlParser: true, useCreateIndex: true});

//Configurando as rotas
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/usuario', usuarioRouter);


//Exportando nossa API
module.exports = app;