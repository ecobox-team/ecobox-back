const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Init backend'));

app.listen(port, err => {
  if (err) {
    console.error(err);
    return;
  }
})
