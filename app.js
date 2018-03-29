const path    = require('path');

const dotenv  = require('dotenv').config();
const express = require('express');
const inwx    = require('inwx');

const auth    = require('./auth');

const app     = express();

const PORT              = process.env.SERVER_PORT || 3000;
const AUTH_CONFIG_FILE  = process.env.AUTH_CONFIG_FILE || config.json;
const CONFIG            = require(path.join(__dirname, AUTH_CONFIG_FILE)) || new Array();

const INWX_USER         = process.env.INWX_USER   || '';
const INWX_PASS         = process.env.INWX_PASS   || '';
const INWX_API          = process.env.INWX_API    || 'testing'

//https://dyndns.inwx.com/nic/update?myip=<ipaddr>

app.use(auth(CONFIG));

try {
  inwx({ api : INWX_API, user : INWX_USER, pass : INWX_PASS }, (api) => {
    console.log("API is ready!");

    api.call('account', 'info', {}, (res) => {
      console.log('account.info response:\n', res);
      api.close();
    });
  });
} catch(e) {
  console.log(e);
}


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
