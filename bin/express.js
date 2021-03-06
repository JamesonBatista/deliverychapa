const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');

//routers
const categoriaRouter = require('../routes/catergoria-router');
const produtoRouter = require('../routes/produto-router');
const usuarioRouter = require('../routes/usuario-router');
const pedidoRouter = require('../routes/pedido-router');
const pedidoRouterUser = require('../routes/pedido-router-user');
const utilRouter = require('../routes/util-router');
const ligardesligarRouter = require('../routes/ligardesligar-router');
const colorRouter = require('../routes/color-router');
const feedbackRouter = require('../routes/feedback-router');





//Criando/Invocando a Api/Server Web do Express
const app = express();

//Configuração de parse do JSON
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

//Configurando a conexão com banco de dados
mongoose.connect(variables.Database.connection, { useNewUrlParser: true });

//Configurando as rotas
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/pedido', pedidoRouter);
app.use('/api/pedidoUser', pedidoRouterUser);
app.use('/api/util', utilRouter);
app.use('/api/ligardesligar', ligardesligarRouter);
app.use('/api/color', colorRouter);
app.use('/api/feedback', feedbackRouter);







//Exportando nossa Api
module.exports = app;


// Api -> MIDDLEWARES -> Rotas -> Controller -> Repository -> Banco