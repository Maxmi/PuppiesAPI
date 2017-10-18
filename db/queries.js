const options = {};

const pgp = require('pg-promise')(options);

const connection_options = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'puppies_test' : 'puppies' 
}


const db = pgp(connection_options);

// query functions
function getAllPuppies(req, res, next) {
  db.any('SELECT * FROM pups')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch((err) => {
      return next(err);
    })
}

function getSinglePuppy(req, res, next) {
  const pupID = Number(req.params.id);
  db.one('SELECT * FROM pups WHERE id = $1', pupID)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = Number(req.body.age);
  db.none('INSERT INTO pups (name, breed, age, gender)' +
      'VALUES (${name}, ${breed}, ${age}, ${gender})',
      req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('UPDATE pups SET name=$1, breed=$2, age=$3, gender=$4 WHERE id=$5', [req.body.name, req.body.breed, Number(req.body.age), req.body.gender, Number(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};