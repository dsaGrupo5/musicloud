drop database if exists musiclouddb;
create database musiclouddb;
use musiclouddb;


CREATE TABLE users (
    id BINARY(16) NOT NULL,
    login VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(15) NOT NULL,
    apellidos VARCHAR(15) NOT NULL,	
    email VARCHAR(255) NOT NULL,
    password BINARY(16) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE genero (
    id BINARY(16) NOT NULL,    
    nombre VARCHAR(255) NOT NULL,    	
    PRIMARY KEY (id)    
);
CREATE TABLE canciones (
    id BINARY(16) NOT NULL,
    artista VARCHAR(15) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    idgenero BINARY(16) NOT NULL,
    last_modified TIMESTAMP NOT NULL,
    creation_timestamp DATETIME not null default current_timestamp,	
    PRIMARY KEY (id),
    FOREIGN KEY (idgenero) REFERENCES genero(id) on delete cascade
);
CREATE TABLE listas_usuarios (
    id BINARY(16) NOT NULL,
    iduser BINARY(16) NOT NULL,
    nombre VARCHAR(255) NOT NULL,	
    PRIMARY KEY (id),
    FOREIGN KEY (iduser) REFERENCES users(id) on delete cascade
);
CREATE TABLE lista_cancion (
    idlista BINARY(16) NOT NULL,
    idcancion BINARY(16) NOT NULL,	
    PRIMARY KEY (idlista,idcancion),
    FOREIGN KEY (idlista) REFERENCES listas_usuarios(id) on delete cascade,
    FOREIGN KEY (idcancion) REFERENCES canciones(id) on delete cascade
);
CREATE TABLE user_roles (
    iduser BINARY(16) NOT NULL,
    role ENUM ('registrado','noregistrado','administrador'),
    PRIMARY KEY (iduser, role),
    FOREIGN KEY (iduser) REFERENCES users(id) on delete cascade    
);

CREATE TABLE auth_tokens (
    iduser BINARY(16) NOT NULL,
    token BINARY(16) NOT NULL,
    PRIMARY KEY (token),
    FOREIGN KEY (iduser) REFERENCES users(id) on delete cascade    
);