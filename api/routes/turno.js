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
router.get('/:fecha', (req, res, next) => {
    const fecha = req.params.fecha;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno('', '"+fecha+"') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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

//RUTA GET (LISTAR TODOS)
router.get('/:med_id/:fecha', (req, res, next) => {
    const med_id = req.params.med_id;
    const fecha = req.params.fecha;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno_segun_medico('', '"+med_id+"', '"+fecha+"') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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
router.get('/listar/:filtro/:fecha', (req, res, next) => {
    const filtro = req.params.filtro;
    const fecha = req.params.fecha;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno('"+filtro+"', '"+fecha+"') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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
        return client.query("select ins_turno('"+req.body.fecha+"', '"+req.body.total_citas+"', '"+req.body.usuario_id+"', '"+req.body.consultorio_id+"', '"+req.body.horario_id+"')")
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
router.get('/detalle/detalle/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno_detalle('"+id+"') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, especialidad_id int, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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
        return client.query("select upd_turno('"+id+"', '"+req.body.fecha_turno+"', '"+req.body.total_citas+"', '"+req.body.usuario_id+"', '"+req.body.consultorio_id+"', '"+req.body.horario_id+"', true)")
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
router.put('/estado/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select upd_turno('"+id+"', '"+req.body.fecha_turno+"', '"+req.body.total_citas+"', '"+req.body.usuario_id+"', '"+req.body.consultorio_id+"', '"+req.body.horario_id+"', '"+req.body.estado+"')")
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

//RUTA PUT (INHABILITAR)
router.put('/inh/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select upd_turno_inhabilitar('"+id+"')")
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

//RUTA PUT (INHABILITAR)
router.put('/hab/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select upd_turno_habilitar('"+id+"')")
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

//RUTA PUT (REDUCIR CITAS DISPONIBLES)
router.put('/redct/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select upd_turno_reducir_citas_disponibles('"+id+"')")
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

//RUTA PUT (AUMENTAR CITAS DISPONIBLES)
router.put('/aumct/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select upd_turno_aumentar_citas_disponibles('"+id+"')")
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

//RUTA GET (TURNO - MÉDICO - DISPONIBLE)
router.get('/medico/:id/:fecha', (req, res, next) => {
    const id_es = req.params.id;
    const fecha = req.params.fecha;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno_medico_disponible('"+id_es+"', '"+fecha+"', '') as (id integer, total_citas integer, nombre_medico text, foto character varying, consultorio character varying, horario text)")
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

//RUTA GET (TURNO POR MÉDICO)
router.get('/reporte-medico/:id/:fecha_desde/:fecha_hasta', (req, res, next) => {
    const id_me = req.params.id;
    const fecha_desde = req.params.fecha_desde;
    const fecha_hasta = req.params.fecha_hasta;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_turno_por_medico('"+id_me+"', '"+fecha_desde+"', '"+fecha_hasta+"', '') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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

//RUTA GET (REPORTE MIS TURNOS MÉDICO)
router.get('/reporte/mis_turnos/:id_me/:fecha_desde/:fecha_hasta', (req, res, next) => {
    const id = req.params.id_me;
    const f_desde = req.params.fecha_desde;
    const f_hasta = req.params.fecha_hasta;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_mis_turnos('"+id+"', '"+f_desde+"', '"+f_hasta+"') as (id int, fecha_turno text, total_citas int, usuario_id int, nombres character varying, apellido_paterno character varying, apellido_materno character varying, consultorio_id int, numero_consultorio character varying, horario_id int, hora_entrada time, hora_salida time, estado boolean, createdat text)")
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

module.exports = router;