const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

//RUTAS
const loginRoutes = require('./api/routes/login');
const rolRoutes = require('./api/routes/rol');
const usuarioRoutes = require('./api/routes/usuario');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/login', loginRoutes);
app.use('/rol', rolRoutes);
app.use('/usuario', usuarioRoutes);

module.exports = app;
