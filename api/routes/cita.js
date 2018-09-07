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
        return client.query("select * from ins_reserva_sin_usuario('"+req.body.fecha+"', '"+req.body.horario+"', '"+req.body.tiempo+"', '"+req.body.costo+"', '"+req.body.paciente+"', '"+req.body.turno+"', '"+req.body.doc_ide+"', '"+req.body.celular+"')")
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
router.get('/reserva/paciente/:id/:fecha_hoy', (req, res, next) => {
    const id = req.params.id;
    const fecha_hoy = req.params.fecha_hoy;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva_por_paciente('"+id+"', '"+fecha_hoy+"') as (reserva_id integer, paciente_id integer, turno_id integer, costo numeric(10,2), fecha text, paciente text, especialidad character varying, medico text, consultorio character varying, hora_cita time)")
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
router.get('/reserva/detalle/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva_detalle('"+id+"') as (id int, fecha text, horario character varying(100), paciente text, medico text, consultorio character varying(100), especialidad character varying(100), tiempo_plazo int, costo numeric(10,2), estado boolean, paciente_id int, turno_id int, createdat text)")
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
router.get('/reserva', (req, res, next) => {
    const filtro = req.params.filtro;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva('') as (id int, doc_ide_re varchar(20), doc_ide_pa varchar(20), paciente text, celular_re character varying, celular_pa character varying, medico text, fecha text, horario character varying, tiempo_plazo int, costo numeric(10,2), estado boolean, paciente_id int, turno_id int, enlazar boolean, reservar boolean, createdat text)")
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
router.get('/reserva/med_fe/:id_m/:fecha', (req, res, next) => {
    const id_m = req.params.id_m;
    const fecha = req.params.fecha;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva_medico_fecha('"+id_m+"', '"+fecha+"') as (id int, doc_ide_re varchar(20), doc_ide_pa varchar(20), paciente text, celular_re character varying, celular_pa character varying, medico text, fecha text, horario character varying, tiempo_plazo int, costo numeric(10,2), estado boolean, paciente_id int, turno_id int, enlazar boolean, reservar boolean, createdat text)")
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
router.get('/reserva/:filtro', (req, res, next) => {
    const filtro = req.params.filtro;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_reserva('"+filtro+"') as (id int, doc_ide_re varchar(20), doc_ide_pa varchar(20), paciente text, celular_re character varying, celular_pa character varying, medico text, fecha text, horario character varying, tiempo_plazo int, costo numeric(10,2), estado boolean, paciente_id int, turno_id int, enlazar boolean, reservar boolean, createdat text)")
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
router.get('/hoy/:id/:turno_id/:fecha_hoy', (req, res, next) => {
    const id = req.params.id;
    const turno_id = req.params.turno_id;
    const fecha_hoy = req.params.fecha_hoy;
    
    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from sel_citas_hoy_por_medico('"+id+"', '"+turno_id+"', '"+fecha_hoy+"') as (id int, paciente_id int, doc_identidad varchar(20), paciente text, fecha_nacimiento text)")
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
        return client.query("select * from sel_historial_citas_por_paciente('"+id+"') as (cita_id integer, fecha text, paciente text, especialidad character varying, medico text, consultorio character varying, hora_cita time)")
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

//RUTA PUT ENLAZAR
router.put('/enlazar/:id_re/:id_pac', (req, res, next) => {
    const id_re = req.params.id_re;
    const id_pac = req.params.id_pac;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })
    
    pool.connect()
    .then(client => {
        return client.query("select upd_reserva_enlazar('"+id_re+"', '"+id_pac+"')")
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
router.put('/evaluacion/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from upd_evaluacion_cita('"+req.body.p_ruc+"', '"+req.body.p_empresa +"', '"+req.body.p_fecha+"', '"+req.body.p_t_doc_emitido+"', '"+req.body.p_nro_doc_emitido+"', '"+req.body.sv_fc+"', '"+req.body.sv_fr+"', '"+req.body.sv_pa+"', '"+req.body.sv_tem+"', '"+req.body.sv_pe+"', '"+req.body.sv_tal+"', '"+req.body.sv_imc+"', '"+req.body.sv_dmo+"', '"+req.body.h_p_a+"', '"+req.body.in_d+"', '"+req.body.act_fis+"', '"+req.body.d_desc+"', '"+req.body.m1+"', '"+req.body.m1_det+"', '"+req.body.m2+"', '"+req.body.m2_det+"', '"+req.body.m3+"', '"+req.body.m3_det+"', '"+req.body.m4+"', '"+req.body.m4_det+"', '"+req.body.m5+"', '"+req.body.m5_det+"', '"+req.body.m_rec_fis+"', '"+req.body.m_rec_fis_tipo+"', '"+req.body.m_rec_fis_otr+"', '"+req.body.m_fis_rehab+"', '"+req.body.m_alt_fitot+"', '"+req.body.m_alt_fotohem+"', '"+req.body.m_alt_prp+"', '"+req.body.m_alt_cel_m+"', '"+req.body.m_alt_infilt+"', '"+req.body.m_alt_baro_cam+"', '"+req.body.m_alt_ozono+"', '"+req.body.e_v+"', '"+req.body.e_v_otr +"', '"+req.body.inter1+"', '"+req.body.inter1_det+"', '"+req.body.inter2+"', '"+req.body.inter2_det+"', '"+req.body.inter3+"', '"+req.body.inter3_det+"', '"+req.body.so_es_hemogr+"', '"+req.body.so_es_hemogl+"', '"+req.body.so_es_gluc+"', '"+req.body.so_es_ure+"', '"+req.body.so_es_creatin+"', '"+req.body.so_es_ex_c_ori+"', '"+req.body.so_es_hormon+"', '"+req.body.so_es_cultiv+"', '"+req.body.so_es_ecogra+"', '"+req.body.so_es_rx+"', '"+req.body.so_es_tomogr+"', '"+req.body.so_es_resomag+"', '"+req.body.so_es_otr+"', '"+req.body.recom+"', '"+req.body.remun+"', '"+id+"')")
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
router.put('/evaluacion_ant/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from upd_evaluacion_cita_ant('"+req.body.ant_tra+"', '"+req.body.ant_lug_tra+"', '"+req.body.ant_tie_ult_tra+"', '"+req.body.ant_instru+"', '"+req.body.ant_enf_card+"', '"+req.body.ant_enf_card_det+"', '"+req.body.ant_enf_pulm+"', '"+req.body.ant_enf_pulm_det+"', '"+req.body.ant_diab+"', '"+req.body.ant_diab_det+"', '"+req.body.ant_ale_alim+"', '"+req.body.ant_ale_alim_det+"', '"+req.body.ant_ale_medic+"', '"+req.body.ant_ale_medic_det+"', '"+req.body.ant_coles+"', '"+req.body.ant_coles_det+"', '"+req.body.ant_ts+"', '"+req.body.ant_ts_det+"', '"+req.body.ant_quir+"', '"+req.body.ant_quir_det+"', '"+req.body.ant_otr+"', '"+req.body.ex_piel+"', '"+req.body.ex_cabeza+"', '"+req.body.ex_ojo+"', '"+req.body.ex_torax+"', '"+req.body.ex_ap_resp+"', '"+req.body.ex_ap_card+"', '"+req.body.ex_ap_gastr+"', '"+req.body.ex_ap_genito+"', '"+req.body.ex_ap_musc+"', '"+req.body.ex_neuro+"', '"+req.body.ana_lab+"', '"+req.body.ana_lab_det+"', '"+req.body.im_rx+"', '"+req.body.im_tomo+"', '"+req.body.im_reso+"', '"+req.body.im_gamm+"', '"+req.body.ima_det+"', '"+req.body.dia_det+"', '"+req.body.prono+"', '"+id+"')")
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

//RUTA GET SIN PA
router.get('/hc/cita/:id', (req, res, next) => {
    const id = req.params.id;

    //VARIABLES DE ALMACENAMIENTO
    var results = [];
    
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    })

    pool.connect()
    .then(client => {
        return client.query("select * from cita where id = '"+id+"'")
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