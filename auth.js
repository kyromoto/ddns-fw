const auth    = require('basic-auth');

module.exports = (config) => {
  return (req, res, next) => {
    var credentials = auth(req);

    var account = config.filter(entry => entry.username == credentials.name);

    if (account == null) {
      console.log("ERROR : result of config filter is null.");
      return res.send("ERROR : username or password invalid");
    }

    if (account.length > 1) {
      console.log("ERROR : Found more then 1 account.");
      return res.send("ERROR : username or password invalid");
    }

    if (account.length < 1) {
      console.log("ERROR : Did not found username %s!", credentials.name);
      return res.send("ERROR : username or password invalid");
    }

    if (account[0].password != credentials.pass) {
      console.log("ERROR : password for username %s did not match.", credentials.name);
      return res.send("ERROR : username or password invalid");
    }

    //add values to request
    if(typeof req.locals === 'undefined') {
      req.locals = new Object();
    }

    req.locals.auth = {
      username : account[0].username,
      hostname : account[0].hostname
    }

    next();
  }
}
