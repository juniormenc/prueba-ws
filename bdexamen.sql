CREATE TABLE rol
(
  id serial NOT NULL,
  nombre character varying(30) NOT NULL,
  createdat timestamp without time zone NOT NULL DEFAULT now(),
  updatedat timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT rol_pkey PRIMARY KEY (id)
);

--insert into rol (nombre) values('Administrador');
--insert into rol (nombre) values('Solo Lectura');
--insert into rol (nombre) values('Edición');

CREATE TABLE usuario
(
  id serial primary key,
  usuario character varying(100) NOT NULL,
  clave character varying(32) NOT NULL,
  estado_habilitado boolean NOT NULL DEFAULT true,
  estado_activado boolean NOT NULL DEFAULT true,
  nombre character varying(200) NOT NULL,
  correo character varying(100) NOT NULL,
  rol_id integer NOT NULL references rol(id),
  createdat timestamp without time zone NOT NULL DEFAULT now(),
  updatedat timestamp without time zone NOT NULL DEFAULT now()
);

insert into usuario (usuario, clave, nombre, correo, rol_id) values('admin', md5('admin'), 'Junior Mendoza', 'juniormenc@gmail.com', 1);

