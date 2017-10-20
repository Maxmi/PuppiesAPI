const express = require('express');
const queries = require('../db/queries');

const router = express.Router();

router.get('/api/puppies', (res, req, next) => {
  queries.getAllPuppies().then((data) => {
    res.status(200)
      .json({
        status: 'success',
        data,
        message: 'Retrieved ALL puppies',
      });
  })
    .catch(err => next(err))
})
router.get('/api/puppies/:id', queries.getSinglePuppy);
router.post('/api/puppies', queries.createPuppy);
router.put('/api/puppies/:id', queries.updatePuppy);
router.delete('/api/puppies/:id', queries.removePuppy);

module.exports = router;
