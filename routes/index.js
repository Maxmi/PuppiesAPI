const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/api/puppies', (req, res, next) => {
  queries.getAllPuppies()
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(err => next(err));
});

router.get('/api/puppies/:id', (req, res, next) => {
  const id = Number(req.params.id);
  queries.getSinglePuppy(id)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data,
          message: `Retrieved puppy with id ${id}`
        });
    })
    .catch(err => next(err));
});


router.post('/api/puppies', (req, res, next) => {
  const name = req.body.name;
  const breed = req.body.breed;
  const age = req.body.age;
  const gender = req.body.gender;

  queries.createPuppy(name, breed, age, gender)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        });
    })
    .catch(err => next(err));
});


router.put('/api/puppies/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const name = req.body.name;
  const breed = req.body.breed;
  const age = req.body.age;
  const gender = req.body.gender;

  queries.updatePuppy(name, breed, age, gender, id)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated puppy with id ${id}`
        });
    })
    .catch(err => {
      return next(err);
    })

});

router.delete('/api/puppies/:id', (req, res, next) => {
  const id = Number(req.params.id);

  queries.removePuppy(id)
    .then(result => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed puppy with id ${id}`
        });
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;