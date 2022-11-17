--- Criação do Banco de Dados
CREATE DATABASE API_Typescript;

---Criação das tabelas no Schema public
CREATE TABLE public.Users (
	id uuid NOT NULL PRIMARY KEY,
	user_name varchar(80) UNIQUE NOT NULL,
	email varchar(80) UNIQUE NOT NULL,
	first_name varchar(80) NOT NULL,
	last_name varchar(80) NOT NULL,
	password varchar(80) NOT NULL,
	squad uuid,
	is_admin BOOLEAN NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);

CREATE TABLE public.Squad (
	id uuid NOT NULL PRIMARY KEY,
	name varchar(80) NOT NULL,
  	leader uuid NOT NULL,
	created_at timestamptz default now(),
	updated_at timestamptz,
	deleted_at timestamptz
);


ALTER TABLE Users ADD CONSTRAINT User_fk0 FOREIGN KEY (squad) REFERENCES Squad(id);

ALTER TABLE Squad ADD CONSTRAINT Squad_fk0 FOREIGN KEY (leader) REFERENCES Users(id);
