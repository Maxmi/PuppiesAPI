DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies

CREATE TABLE pups (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR, -- definitely have a separate table for referential integrity
  age VARCHAR, -- better to do date of birth
  gender VARCHAR -- separate table for referential integrity
);

INSERT INTO pups (name, breed, age, gender)
VALUES ('Coco', 'chihua-hua', 1, 'F');
