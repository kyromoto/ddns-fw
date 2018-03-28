const path    = require('path');

const dotenv  = require('dotenv').config();
const express = require('express');

const auth    = require('./auth');

const app     = express();

const PORT              = process.env.SERVER_PORT || 3000;
const AUTH_CONFIG_FILE  = process.env.AUTH_CONFIG_FILE || config.json;
const CONFIG            = require(path.join(__dirname, AUTH_CONFIG_FILE)) || new Array();

//https://dyndns.inwx.com/nic/update?myip=<ipaddr>

app.use(auth(CONFIG));

app.get('/api/update', (req, res) => {
  if (typeof req.query.myip === 'undefined') {
    return res.send("ERROR");
  }

  console.log(req.query.myip);
  res.send("SUCCESS");
});

app.listen(PORT, () => {
  console.log("Server is listening on port %s!", PORT);
});
