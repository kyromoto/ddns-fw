const path      = require('path');

const express   = require('express');
const inwx      = require('inwx');

const auth      = require(path.join(__dirname, 'auth'));
const Lib       = require(path.join(__dirname, 'Lib'));

const INWX_USER = process.env.INWX_USER   || 'nouser';
const INWX_PASS = process.env.INWX_PASS   || 'nopassword';
const INWX_API  = process.env.INWX_API    || 'testing'

const ACCOUNTS  = require(path.join(__dirname, '..', 'config', 'accounts.json')) || new Array();

const router    = express.Router();

console.log('use INWX Account %s @ %s', INWX_USER, INWX_API);

//use authenticate middleare
router.use(auth(ACCOUNTS));

router.get('/', (req, res) => {
  let newIp     = req.query.myip;
  let hostname  = req.query.hostname;

  let mainDomain = Lib.getMainDomain(hostname);

  if (typeof mainDomain == 'undefined') {
    console.log("ERROR : main domain is undefined. ABORT!!!");
    return res.status(500).send('fatal');
  }

  let inwxConfIPv4 = {
    "domain" : mainDomain,
    "opt1" : { "content" : newIp }, //"146.95.132.58"
    "opt2" : { "type" : "A", "name" : hostname }
  }

  //API Call
  inwx({ api : INWX_API, user : INWX_USER, password : INWX_PASS }, (api) => {
    api.nameserverRecordHelper(
      inwxConfIPv4.domain,
      'update',
      inwxConfIPv4.opt1,
      inwxConfIPv4.opt2,
      (success) => {
        console.log(success);
        api.close();
        return res.send("good");
      },
      (error) => {
        console.log(error);
        api.close();
        return res.send("fatal");
      }
    );
  });
});

module.exports = router;
