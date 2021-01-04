CREATE DATABASE todo;

CREATE TABLE item(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255)
);

CREATE TABLE user(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	password VARCHAR(30),
	itemsId 
);
