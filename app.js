const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

//RUTAS
const usuarioRoutes = require('./api/routes/usuario');

const cieRoutes = require('./api/routes/cie');
const citaRoutes = require('./api/routes/cita');
const especialidadRoutes = require('./api/routes/especialidad');
const medicoRoutes = require('./api/routes/medico');
const horarioRoutes = require('./api/routes/horario');
const consultorioRoutes = require('./api/routes/consultorio');
const turnoRoutes = require('./api/routes/turno');
const pacienteRoutes = require('./api/routes/paciente');
const antecedentesRoutes = require('./api/routes/registro_antecedentes');
const loginRoutes = require('./api/routes/login');
const ubigeoRoutes = require('./api/routes/ubigeo');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/usuario', usuarioRoutes);

app.use('/cie', cieRoutes);
app.use('/cita', citaRoutes);
app.use('/especialidad', especialidadRoutes);
app.use('/medico', medicoRoutes);
app.use('/horario', horarioRoutes);
app.use('/consultorio', consultorioRoutes);
app.use('/turno', turnoRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/antecedentes', antecedentesRoutes);
app.use('/login', loginRoutes);
app.use('/ubigeo', ubigeoRoutes);

module.exports = app;