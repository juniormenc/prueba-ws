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
router.post('/pagar', (req, res, next) => {

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from ins_cita('"+req.body.nro_cita+"', '"+req.body.fecha+"', '"+req.body.costo_defecto+"', '"+req.body.costo_final+"', '"+req.body.hora_inicio_consulta+"', '"+req.body.hora_fin_consulta+"', '"+req.body.paciente+"', '"+req.body.turno+"')")
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
        return client.query("select * from sel_cita_por_paciente('"+id+"') as (fecha text, paciente text, especialidad character varying, medico text, consultorio character varying, hora_cita time)")
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
router.post('/reservar', (req, res, next) => {

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from ins_reserva('"+req.body.fecha+"', '"+req.body.horario+"', '"+req.body.tiempo+"', '"+req.body.costo+"', '"+req.body.paciente+"', '"+req.body.turno+"')")
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
router.post('/reservar/sin_usuario', (req, res, next) => {

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from ins_reserva_sin_usuario('"+req.body.fecha+"', '"+req.body.horario+"', '"+req.body.tiempo+"', '"+req.body.costo+"', '"+req.body.paciente+"', '"+req.body.turno+"', '"+req.body.dni+"', '"+req.body.celular+"')")
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
router.get('/reserva/paciente/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva_por_paciente('"+id+"') as (reserva_id integer, paciente_id integer, turno_id integer, costo numeric(10,2), fecha text, paciente text, especialidad character varying, medico text, consultorio character varying, hora_cita time)")
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
router.get('/hoy/:id', (req, res, next) => {
    const id = req.params.id;
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_citas_hoy_por_medico('"+id+"') as (id int, paciente_id int, dni character(8), paciente text, fecha_nacimiento text)")
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
router.get('/historial/paciente/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_historial_citas_por_paciente('"+id+"') as (fecha text, paciente text, especialidad character varying, medico text, consultorio character varying, hora_cita time, signos character varying, sintomas character varying, diagnostico_medico character varying, receta_tratamiento_medico character varying)")
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

//RUTA DELETE
router.delete('/reservar/:id', (req, res, next) => {
    const id = req.params.id;
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("delete from reserva where id = '"+id+"'")
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

//RUTA PUT
router.put('/finalizar/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from upd_cita_finalizar('"+id+"', '"+req.body.hora_inicio+"', '"+req.body.hora_fin+"')")
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

//RUTA POST
router.post('/evaluacion', (req, res, next) => {

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from ins_evaluacion_cita('"+req.body.talla+"', '"+req.body.peso+"', '"+req.body.presion+"', '"+req.body.examenes_realizados+"', '"+req.body.signos+"', '"+req.body.sintomas+"', '"+req.body.examenes_por_realizarse+"', '"+req.body.diagnostico_medico+"', '"+req.body.receta_tratamiento_medico+"', '"+req.body.cita_id+"')")
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

//RUTA GET (REPORTE RESERVAS)
router.get('/reporte/reservas_pendientes/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_reservas_por_fecha('"+f_desde+"', '"+f_hasta+"', '') as (id integer, fecha text, horario character varying, tiempo_plazo integer, costo numeric(10,2), estado boolean, nombre_paciente text, nombre_medico text, createdat text)")
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

//RUTA GET (REPORTE CITAS POR ATENDER)
router.get('/reporte/citas_por_atender/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_citas_por_fecha('"+f_desde+"', '"+f_hasta+"', '') as (id integer, fecha text, hora_entrada time without time zone, hora_salida time without time zone, estado boolean, nombre_paciente text, nombre_medico text, createdat text)")
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

//RUTA GET (REPORTE INGRESOS POR CITA - DETALLADO)
router.get('/reporte/ingresos_citas/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_ingresos_por_citas('"+f_desde+"', '"+f_hasta+"') as (fecha text, costo_final numeric, cantidad_citas bigint, nombre_medico text)")
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

//RUTA GET (REPORTE INGRESOS POR CITA - SUMA TOTAL)
router.get('/reporte/ingresos_citas_suma/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_sum_ingresos_por_citas('"+f_desde+"', '"+f_hasta+"') as (ingreso numeric, cantidad bigint)")
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

//RUTA GET (REPORTE INGRESOS POR CITA - ESPECIALIDAD)
router.get('/reporte/ingresos_citas_especialidad/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_ingresos_por_citas_toda_especialidad('"+f_desde+"', '"+f_hasta+"') as (ingreso numeric, cantidad bigint, especialidad character varying)")
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

//RUTA GET (REPORTE INGRESOS POR CITA POR MÉDICO - SUMA TOTAL)
router.get('/reporte/ingresos_citas_suma/:id_me/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_sum_ingresos_por_citas_por_medico('"+id+"', '"+f_desde+"', '"+f_hasta+"') as (ingreso numeric, cantidad bigint)")
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

//RUTA GET (REPORTE INGRESOS POR CITA POR MÉDICO)
router.get('/reporte/ingresos_citas/:id_me/:fecha_desde/:fecha_hasta', (req, res, next) => {
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
        return client.query("select * from sel_ingresos_por_citas_por_medico('"+id+"', '"+f_desde+"', '"+f_hasta+"') as (fecha text, ingreso numeric, cantidad bigint, nombre_medico text)")
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