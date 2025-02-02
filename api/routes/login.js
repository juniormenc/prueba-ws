const express = require('express');
const router = express.Router();

const { Client } = require('pg');
const serverBD = require('../connection/connect');

const jwt = require('jwt-simple');
const moment = require('moment');

//DATOS PARA LA CONEXIÓN
const client = new Client({
    user: serverBD.username,
    host: serverBD.ip,
    database: serverBD.database,
    password: serverBD.password,
    port: serverBD.port,
    ssl: serverBD.ssl,
    max: serverBD.max,
    idleTimeoutMillis: serverBD.idleTimeoutMillis
})

//RUTA POST
router.post('/', (req, res, next) => {
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    var count = 0;

    // Get a Postgres client from the connection pool
    client.connect((err) => {
        // Handle connection errors
        if(err) {
            //done();
            console.error('connection error', err.stack)
        }else{
            console.log('connected')
        }
    });

    //SQL Query
    client.query("select * from sel_iniciar_sesion('"+req.body.usuario+"', '"+req.body.clave+"') as (id integer, nombre character varying, cantidad integer, ri integer)")
    .then(result => {
            //console.log(result);
            count = result.rows[0].cantidad;
            results = result.rows[0];
        })
    .catch(e => {
        console.error(e.stack)
    })
    .then(() => {
        
        return res.status(201).json({
            recordSet: {
                count: count,
                element: {
                    results
                },
            },
        });

        client.end()
    })

});

module.exports = router;