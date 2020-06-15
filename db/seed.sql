DROP TABLE IF EXISTS user_history;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS cars;

CREATE TABLE roles(
  id serial primary key,
  name varchar(10)
);

CREATE TABLE users (
  id serial primary key,
  email varchar(150) not null unique,
  role_id int not null references roles(id),
  hash text not null
);

CREATE TABLE user_history(
  id serial primary key,
  user_id int references users(id),
  method varchar(10),
  path text,
  authorized boolean,
  count int default 1
);

CREATE TABLE movies(
  id serial primary key,
  title varchar(250),
  rating int,
  year int
);

CREATE TABLE cars(
  id serial primary key,
  make varchar(100),
  model varchar(100),
  miles int,
  color varchar(20),
  year int
);

INSERT INTO roles (name)
VALUES('user'), ('admin');