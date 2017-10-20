const pgp = require('pg-promise')();
const monitor = require('pg-monitor');

const connectionOptions = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'puppies_test' : 'puppies'
}

const db = pgp(connectionOptions);

const getAllPuppies = () => {
  return db.any('SELECT * FROM pups');
};

const getSinglePuppy = id => {
  return db.one('SELECT * FROM pups WHERE id=$1', [id]);
};

const createPuppy = (name, breed, age, gender) => {
  return db.none('INSERT INTO pups (name, breed, age, gender)' +
    'VALUES ($1, $2, $3, $4)', [name, breed, age, gender]);
};

const updatePuppy = (name, breed, age, gender, id) => {
  return db.none('UPDATE pups SET name=$1, breed=$2, age=$3, gender=$4' + 
'WHERE id=$5', [name, breed, age, gender, id]);
};

const removePuppy = id => {
    return db.result('DELETE FROM pups WHERE id=$1', [id]);
}

const closeConnection = ()  => {
  pgp.end();
};

module.exports = {
  getAllPuppies,
  getSinglePuppy,
  createPuppy,
  updatePuppy,
  removePuppy
};