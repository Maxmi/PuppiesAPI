DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age VARCHAR,
  gender VARCHAR
);

INSERT INTO pups (name, breed, age, gender) 
VALUES ('Coco', 'chihua-hua', 1, 'F');