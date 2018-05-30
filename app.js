const path    = require('path');

const dotenv  = require('dotenv').config();
const express = require('express');
const helmet  = require('helmet');

const app     = express();

const PORT              = process.env.SERVER_PORT || 3000;
const NODE_ENV          = process.env.NODE_ENV    || 'development';

console.log("NODE_ENV: %s", NODE_ENV);

//https://dyndns.inwx.com/nic/update?myip=<ipaddr>

if (NODE_ENV == "production") app.use(helmet());

app.use('/hello', require(path.join(__dirname, 'hello')));

app.use('/update', require(path.join(__dirname, 'ddnsServer')));

app.listen(PORT, () => console.log("DDNS-FW app is listening on port %s!", PORT));

if (NODE_ENV == "test") {
  module.exports = app;
}
