const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "production"

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

const ecoBox = require('./api/ecoBox');

app.use('/api', ecoBox);
app.get('/', (req, res) => res.send('EcoBox API Server'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`EcoBox API Server listening on port ${port}!`);
})