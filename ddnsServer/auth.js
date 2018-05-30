const auth    = require('basic-auth');

module.exports = (accounts) => {
  //console.log(JSON.stringify(accounts, null, 2));
  return (req, res, next) => {
    var hostname  = req.query.hostname;

    if (typeof hostname == "undefined") {
      console.log("ERROR : no hostname transmitted.");
      return res.status(400).send("no hostname");
    }

    var account = accounts.filter(entry => entry.hostname == hostname);

    if (account == null) {
      console.log("ERROR : result of config filter is null.");
      return res.status(401).send("badauth");
    }

    if (account.length != 1) {
      console.log("ERROR : No or ambiguous account.");
      return res.status(401).send("badauth");
    }

    //get login credentials from request
    let credentials = auth(req);

    if (account[0].username != credentials.name || account[0].password != credentials.pass) {
      console.log("ERROR : Wrong username or password.");
      return res.status(401).send("badauth");
    }

    console.log("SUCCESS: %s for %s succesfully authenticated.", credentials.name, hostname);
    return next();
  }
}
