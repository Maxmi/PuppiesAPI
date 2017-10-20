Example of creating RESTful API with Node, Express and Postgres

Fork/Clone  
Install dependencies - npm install  
Make sure you don't have a db with name puppies, otherwise the command below will overwrite it.
Create and load database  - psql -U username -f db/puppies.sql
Run the app  - npm start  


Notes for myself:
create separate tables for breeds and genders and have referential integrity
change age column to date of birth 
add tests...