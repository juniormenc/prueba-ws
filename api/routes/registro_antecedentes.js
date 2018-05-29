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
        return client.query("select * from ins_registro_antecedentes('', '', '', '', '', '', '', '', '', 0, 0, 0, '', '', '', '', '', '"+req.body.paciente_id+"')")
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

//RUTA GET
router.get('/paciente/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_registro_antecedentes_por_paciente('"+id+"') as (id integer, ant_madre character varying, ant_padre character varying, ant_hermanos character varying, ant_hijos character varying, ant_otros_familiares character varying, ant_alcohol character(1), ant_tabaco character(1), ant_droga character(1), ant_observaciones_toxicologicas character varying, ant_hospitalizaciones integer, ant_infartos integer, ant_intervenciones integer, ant_alergenos character varying, ant_farmacos_consume character varying, ant_enfermedades_padece character varying, ant_enfermedades_padecio character varying, ant_otros_antecedentes character varying, createdat text)")
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
        return client.query("select * from upd_registro_antecedentes('"+id+"', '"+req.body.a_madre+"','"+req.body.a_padre+"', '"+req.body.a_hermanos+"', '"+req.body.a_hijos+"', '"+req.body.a_otros_familiares+"', '"+req.body.a_alcohol+"', '"+req.body.a_tabaco+"', '"+req.body.a_droga+"', '"+req.body.a_observaciones_toxicologicas+"', '"+req.body.a_hospitalizaciones+"', '"+req.body.a_infartos+"', '"+req.body.a_intervenciones+"', '"+req.body.a_alergenos+"', '"+req.body.a_farmacos_consume+"', '"+req.body.a_enfermedades_padece+"', '"+req.body.a_enfermedades_padecio+"', '"+req.body.a_otros_antecedentes+"')")
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