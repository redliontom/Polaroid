﻿

DO $$
BEGIN
	IF EXISTS (SELECT 1 FROM pg_database WHERE datname = 'polaroid') THEN
		RAISE EXCEPTION 'Datenbank wurde bereits erstellt';
	END IF;
END$$;

--Rolle mit Login ist equivalent zu User
CREATE ROLE admin 
	PASSWORD 'admin'  
	NOSUPERUSER 
	NOCREATEDB 
	CREATEROLE 
	INHERIT 
	LOGIN;

CREATE DATABASE polaroid
	WITH
		OWNER admin
		TEMPLATE template1
		ENCODING 'UTF8'
		TABLESPACE pg_default
		CONNECTION LIMIT -1;
