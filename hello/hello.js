const express   = require('express');

const router    = express.Router();

router.get('/', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send("hello " + ip + "!");
});

module.exports = router;
