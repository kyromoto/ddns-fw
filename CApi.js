const express = require('express');
const inwx    = require('inwx');

const router  = express.Router();

module.exports = (INWX_API, INWX_USER, INWX_PASS) => {
  router.get('/update', (req, res) => {
    if (typeof req.query.myip === 'undefined') {
      console.error("DDNS NO UPDATE IP ERROR");
      return res.status(500).send("fatal");
    }

    var ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/;

    if (!ipv4Regex.test(req.query.myip)) {
      console.error("NO IPv4 ERROR");
      return res.status(500).send("fatal");
    }

    if (typeof req.locals.auth === 'undefined' || req.locals.auth == null) {
      console.error("DDNS AUTH OBJECT ERROR");
      return res.status(500).send("fatal");
    }

    if (typeof req.locals.auth.hostname === 'undefined' || req.locals.auth.hostname == null || req.locals.auth.hostname == '') {
      console.error("DDNS HOSTNAME ERROR");
      return res.status(500).send("fatal");
    }

    //TODO: add Regex test for hostname

    var domain = req.locals.auth.hostname.split('.');

    if (domain.length < 2) {
      console.error("ERROR DOMAIN CONFIG");
      return res.status(500).send("fatal");
    }

    var inwxConfIPv4 = {
      domain : domain[domain.length - 2] + '.' + domain[domain.length - 1],
      opt1 : { content : req.query.myip }, //"146.95.132.58"
      opt2 : { type: "A", name: req.locals.auth.hostname }
    }

    console.log("INWX Update Config: %s", JSON.stringify(inwxConfIPv4));

    var successCallback = (successResponse) => {
      console.log("INWX-WRAPPER UPDATE SUCCESS: %s", JSON.stringify(successResponse));
      return res.send("good");
    }

    var errorCallback = (errorResponse) => {
      console.error("INWX-WRAPPER UPDATE ERROR: %s", JSON.stringify(errorResponse));
      return res.send("fatal");
    }

    //API Call
    inwx({ api : INWX_API, user : INWX_USER, password : INWX_PASS }, (api) => {
      api.nameserverRecordHelper(inwxConfIPv4.domain, 'update', inwxConfIPv4.opt1, inwxConfIPv4.opt2,
        (apiSuccessResponse) => {
          api.close();
          if (apiSuccessResponse.length > 0) {
            successCallback(apiSuccessResponse);
          } else {
            errorCallback(apiSuccessResponse);
          }
        },
        (apiErrorResponse) => {
          errorCallback(apiErrorResponse);
        }
      );
    }, (err) => {
      api.close();
      errorCallback(err);
    });
  });

  return router;
}
