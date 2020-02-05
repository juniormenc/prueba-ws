-------------------------------

CREATE OR REPLACE FUNCTION sel_iniciar_sesion(
    usu character varying,
    cla character varying)
  RETURNS SETOF record AS
$BODY$
declare
	registro record;
	cantidad int;
begin
	select count(*) into cantidad from usuario where usuario = usu and clave = md5(cla);
	
	if cantidad = 0 then
		RAISE EXCEPTION 'Usuario y/o clave son incorrectos';
	end if;

	for registro in (
		select
			u.id,
			u.nombre,
			cantidad,
			u.rol_id
		from usuario u
		where u.usuario = usu and clave = md5(cla)
		and u.estado_habilitado = true
		and u.estado_activado = true
	 ) loop
	return next registro;
	end loop;
return;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

--select * from sel_iniciar_sesion('admin', 'admin') as (id integer, nombre character varying, cantidad integer, ri integer)

-------------------------------

CREATE OR REPLACE FUNCTION ins_usuario(
    usu character varying,
    cla character varying,
    r_i integer,
    nom character varying,
    cor character varying)
  RETURNS integer AS
$BODY$
declare
	v_id integer;
begin
	insert into usuario(usuario, clave, rol_id, nombre, correo)
	values (usu, md5(cla), r_i, nom, cor)
	returning id into v_id;

	return v_id;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


-------------------------------

CREATE OR REPLACE FUNCTION sel_usuario_fil(filtro character varying)
  RETURNS SETOF record AS
$BODY$
declare
	registro record;
begin
	for registro in
	(
	select
		usu.id,
		usu.usuario,
		usu.estado_habilitado,
		CASE WHEN usu.estado_habilitado=true THEN 'HABILITADO'
			ELSE 'DESHABILITADO'
		END,
		usu.estado_activado,
		CASE WHEN usu.estado_activado=true THEN 'ACTIVO'
			ELSE 'DE BAJA'
		END,
		usu.rol_id,
		r.nombre as rol,
		usu.nombre,
		usu.correo,
		usu.createdat,
		usu.updatedat
	from
		usuario usu inner join rol r on r.id = usu.rol_id
	where
		(usu.usuario ilike '%' || filtro || '%'
		or r.nombre ilike '%' || filtro || '%'
		or usu.correo ilike '%' || filtro || '%'
		or usu.nombre ilike '%' || filtro || '%')
	order by
		usu.estado_habilitado desc,
		usu.rol_id asc,
		usu.usuario asc
	)loop
	return next registro;
	end loop;
	return;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

--select * from sel_usuario_fil('') as (id integer, usuario varchar(100), estado_hab boolean, estado_hab_t text, estado_act boolean, estado_act_t text, rol_id integer, rol varchar(30), nombre varchar(200), correo varchar(100), createdat timestamp without time zone, updatedat timestamp without time zone)

-------------------------------

CREATE OR REPLACE FUNCTION sel_usuario(
    offs integer,
    lim integer)
  RETURNS SETOF record AS
$BODY$
declare
	registro record;
begin
	for registro in
	(
	select
		usu.id,
		usu.usuario,
		usu.estado_habilitado,
		CASE WHEN usu.estado_habilitado=true THEN 'HABILITADO'
			ELSE 'DESHABILITADO'
		END,
		usu.estado_activado,
		CASE WHEN usu.estado_activado=true THEN 'ACTIVO'
			ELSE 'DE BAJA'
		END,
		usu.rol_id,
		r.nombre as rol,
		usu.nombre,
		usu.correo,
		usu.createdat,
		usu.updatedat,
		(select count(*) from usuario) as cantidad_total
	from
		usuario usu inner join rol r on r.id = usu.rol_id
	order by
		usu.estado_habilitado desc,
		usu.rol_id asc,
		usu.usuario asc
	offset offs
	limit lim
	)loop
	return next registro;
	end loop;
	return;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;


--select * from sel_usuario(0, 10) as (id integer, usuario varchar(100), estado_hab boolean, estado_hab_t text, estado_act boolean, estado_act_t text, rol_id integer, rol varchar(30), nombre varchar(200), correo varchar(100), createdat timestamp without time zone, updatedat timestamp without time zone, cantidad_total bigint)

------------------------------

CREATE OR REPLACE FUNCTION sel_usuario_id(i integer)
  RETURNS SETOF record AS
$BODY$
declare
	registro record;
begin
	for registro in
	(
	select
		usu.id,
		usu.usuario,
		usu.estado_habilitado,
		CASE WHEN usu.estado_habilitado=true THEN 'HABILITADO'
			ELSE 'DESHABILITADO'
		END,
		usu.estado_activado,
		CASE WHEN usu.estado_activado=true THEN 'ACTIVO'
			ELSE 'DE BAJA'
		END,
		usu.rol_id,
		r.nombre as rol,
		usu.nombre,
		usu.correo,
		usu.createdat,
		usu.updatedat
	from
		usuario usu inner join rol r on r.id = usu.rol_id
	where
		usu.id = i
	order by
		usu.usuario asc
	)loop
	return next registro;
	end loop;
	return;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

--select * from sel_usuario_id(1) as (id integer, usuario varchar(100), estado_hab boolean, estado_hab_t text, estado_act boolean, estado_act_t text, rol_id integer, rol varchar(30), nombre varchar(200), correo varchar(100), createdat timestamp without time zone, updatedat timestamp without time zone)

-------------------------------

CREATE OR REPLACE FUNCTION upd_usuario(
    i integer,
    usu character varying,
    r_i integer,
    nom character varying,
    cor character varying)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		usuario = usu,
		rol_id = r_i,
		nombre = nom,
		correo = cor,
		updatedat = now()
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-------------------------------

CREATE OR REPLACE FUNCTION upd_usuario_alta(i integer)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		estado_habilitado = true
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-------------------------------

CREATE OR REPLACE FUNCTION upd_usuario_baja(i integer)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		estado_habilitado = false
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


-------------------------------

CREATE OR REPLACE FUNCTION upd_usuario_activado(i integer)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		estado_activado = true
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-------------------------------

CREATE OR REPLACE FUNCTION upd_usuario_desactivado(i integer)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		estado_activado = false
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


-------------------------------

CREATE OR REPLACE FUNCTION sel_rol_fil(filtro character varying)
  RETURNS SETOF record AS
$BODY$
declare
	registro record;
begin
	for registro in
	(
	select
		r.id,
		r.nombre,
		r.createdat,
		r.updatedat
	from
		rol r
	where
		(r.nombre ilike '%' || filtro || '%')
	order by
		r.nombre asc
	)loop
	return next registro;
	end loop;
	return;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

-------------------------------

CREATE OR REPLACE FUNCTION upd_clave_usuario_id(
    i integer,
    cla character varying)
  RETURNS void AS
$BODY$
declare
begin
	update usuario set
		clave = md5(cla),
		updatedat = now()
	where
		id = i;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


