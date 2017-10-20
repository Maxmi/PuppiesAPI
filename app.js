const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', routes);

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
  });
});

app.listen(port, console.log(`Listening on port ${port}`));