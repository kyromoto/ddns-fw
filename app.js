const path    = require('path');

const dotenv  = require('dotenv').config();
const express = require('express');

const auth    = require('./auth');

const app     = express();

const PORT              = process.env.SERVER_PORT || 3000;
const AUTH_CONFIG_FILE  = process.env.AUTH_CONFIG_FILE || path.join(__dirname, 'config.json');
const CONFIG            = require(AUTH_CONFIG_FILE) || new Array();

const INWX_USER         = process.env.INWX_USER   || 'nouser';
const INWX_PASS         = process.env.INWX_PASS   || 'nopassword';
const INWX_API          = process.env.INWX_API    || 'testing'

//https://dyndns.inwx.com/nic/update?myip=<ipaddr>

console.log('use INWX Account %s @ %s', INWX_USER, INWX_API);

app.get('/hello', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send("hello " + ip + "!");
});

app.use(auth(CONFIG));

app.use('/api', require('./CApi')(INWX_API, INWX_USER, INWX_PASS));

app.listen(PORT, () => console.log("Server is listening on port %s!", PORT));
