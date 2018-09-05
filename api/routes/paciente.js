const express = require('express');
const router = express.Router();

const { Pool } = require('pg');
const serverBD = require('../connection/connect');

//DATOS PARA LA CONEXIÓN
const pool = new Pool({
    user: serverBD.username,
    host: serverBD.ip,
    database: serverBD.database,
    password: serverBD.password,
    port: serverBD.port,
    ssl: serverBD.ssl,
    max: serverBD.max,
    idleTimeoutMillis: serverBD.idleTimeoutMillis,
})

//RUTA GET (LISTAR TODOS)
router.get('/', (req, res, next) => {
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_paciente('') as (id integer, tipo_doc_ide integer, doc_ide character varying(20), nacionalidad integer, nombres character varying, apellido_paterno character varying, apellido_materno character varying, fecha_nacimiento text, sexo character, departamento_dom character(2), provincia_dom character(2), distrito_dom character(2), domicilio character varying, estado_civil integer, profesion character varying, tipo_sangre integer, correo character varying, celular character varying, estado boolean, tipo_paciente_id integer, createdat text)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results,
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
});

//RUTA GET (LISTAR - FILTRO)
router.get('/listar/:filtro', (req, res, next) => {
    const filtro = req.params.filtro;
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from sel_paciente('"+filtro+"') as (id integer, tipo_doc_ide integer, doc_ide character varying(20), nacionalidad integer, nombres character varying, apellido_paterno character varying, apellido_materno character varying, fecha_nacimiento text, sexo character, departamento_dom character(2), provincia_dom character(2), distrito_dom character(2), domicilio character varying, estado_civil integer, profesion character varying, tipo_sangre integer, correo character varying, celular character varying, estado boolean, tipo_paciente_id integer, createdat text)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results,
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })

});

//RUTA POST
router.post('/', (req, res, next) => {
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from ins_paciente('"+req.body.tipo_doc_identidad+"','"+req.body.doc_identidad+"','"+req.body.nacionalidad+"','"+req.body.nombres+"', '"+req.body.apellido_paterno+"', '"+req.body.apellido_materno+"', '"+req.body.fecha_nacimiento+"', '"+req.body.sexo+"', '"+req.body.departamento+"', '"+req.body.provincia+"', '"+req.body.distrito+"', '"+req.body.domicilio+"', '"+req.body.estado_civil+"', '"+req.body.profesion+"', '"+req.body.tipo_sangre+"', '"+req.body.correo+"', '"+req.body.celular+"', 1)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results,
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
});

//RUTA GET (DETALLE)
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from sel_paciente_detalle('"+id+"') as (id integer, tipo_doc_ide integer, doc_ide character varying(20), nacionalidad integer, nombre character varying, apellido_paterno character varying, apellido_materno character varying, fecha_nacimiento text, edad text, sexo character, departamento_dom character(2), provincia_dom character(2), distrito_dom character(2), domicilio character varying, estado_civil integer, profesion character varying, tipo_sangre integer, correo character varying, celular character varying, estado boolean, tipo_paciente_id integer, createdat text)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results[0],
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
    
});

//RUTA GET (DETALLE)
router.get('/doc_ide/:doc_ide', (req, res, next) => {
    const doc_ide = req.params.doc_ide;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from sel_paciente_doc_ide('"+doc_ide+"') as (id integer, tipo_doc_identidad integer, doc_ide character varying(20), nacionalidad integer, nombre character varying, apellido_paterno character varying, apellido_materno character varying, fecha_nacimiento text, edad text, sexo character, departamento_dom character(2), provincia_dom character(2), distrito_dom character(2), domicilio character varying, estado_civil integer, profesion character varying, tipo_sangre integer, correo character varying, celular character varying, estado boolean, tipo_paciente_id integer, createdat text)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results[0],
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
    
});

//RUTA PUT
router.put('/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from upd_paciente('"+id+"', '"+req.body.departamento+"', '"+req.body.provincia+"', '"+req.body.distrito+"', '"+req.body.domicilio+"', '"+req.body.estado_civil+"', '"+req.body.profesion+"', '"+req.body.tipo_sangre+"', '"+req.body.correo+"', '"+req.body.celular+"', true, 1)")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results[0],
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
});

//RUTA POST CAMBIAR CLAVE
router.post('/clave', (req, res, next) => {
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select upd_clave_paciente('"+req.body.id+"','"+req.body.clantigua+"', '"+req.body.clnueva+"')")
        .then(result => {
            client.release()
            results = result.rows;
            return res.status(201).json({
                recordSet: {
                    element: results[0],
                },
            });
        })
        .catch(e => {
            client.release()
            console.log(err.stack)
        })
    })
});

module.exports = router;