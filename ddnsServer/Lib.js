var Lib = function Helper() {}

Lib.getMainDomain = function getMainDomain(hostname) {
  let splittedHostname = hostname.split('.');

  if (splittedHostname.length < 2) {
    return null;
  }

  return splittedHostname[splittedHostname.length - 2] + '.' + splittedHostname[splittedHostname.length - 1];
}

module.exports = Lib;
