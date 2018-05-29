const express = require('express');
const router = express.Router();

const pg = require('pg');
const serverBD = require('../connection/connect');
connect = 'postgres://'+serverBD.username+':'+serverBD.password+'@'+serverBD.ip+':'+serverBD.port+'/'+serverBD.database;

//RUTA GET
router.get('/', (req, res, next) => {
    
    var results = [];

    const data = {text: req.body.text, complete: false};
    // Get a Postgres client from the connection pool
    pg.connect(connect, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            //console.log(err);
            //return res.status(500).json({success: false, data: err});
            return res.status(500).json({success: false});
        }

        // SQL Query > Select Data
        const query = client.query('Select * from tipo_usuario');
    
        // Stream results back one row at a time
        query.on('row', (row) => {
        results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();

            //Result
            return res.status(201).json({
                data: results,
                message: 'Éxito'
            });
            
        });
    });

});

//RUTA POST
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Funciona POST'
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    if(id == 1 || id == 2){
        res.status(200).json({
            message: 'Usuario Administrador'
    
        });
    } else {
        res.status(200).json({
            message: 'Usuario Médico'
    
        });
    }

    
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Actualizado ' + req.params.id
    });
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'Eliminado ' + req.params.id
    });
});

module.exports = router;