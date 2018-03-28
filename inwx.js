var request = require('request');
var builder = require('xmlbuilder');

module.exports = class {
  constructor() {

  }

  this.api = {
    nameserver : {
      updateRecord : {}
    }
  }

  this.api.nameserver.updateRecord = (INWX_USER, INWX_PASS, INWX_DOMAIN_ID, WAN_IP) => {
    return builder.create({
      methodCall : {
        methodName : {
          '#text' : 'nameserver.updateRecord'
        },
        params : {
          param : {
            value : {
              struct : {
                member : {
                  name {
                    '#text' : 'user'
                  },
                  value : {
                    string : {
                      '#text' : INWX_USER
                    }
                  }
                },
                member : {
                  name {
                    '#text' : 'pass'
                  },
                  value : {
                    string : {
                      '#text' : INWX_PASS
                    }
                  }
                },
                member : {
                  name {
                    '#text' : 'id'
                  },
                  value : {
                    string : {
                      '#text' : INWX_DOMAIN_ID
                    }
                  }
                },
                member : {
                  name {
                    '#text' : 'content'
                  },
                  value : {
                    string : {
                      '#text' : WAN_IP
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  this.sendRequest = (xml) => {
    request({
      method    : 'POST',
      //preambleCRLF: true,
      //postambleCRLF: true,
      uri       : 'https://api.ote.domrobot.com/xmlrpc',
      multipart : [
        {
          'content-type': 'application/xml',
          'body'        : xml
        }
      ],
    },
    function (error, response, body) {
      if (error) {
        return console.error('upload failed:', error);
      }

      console.log("Response: \n%s\n\nBody: \n%s", response, body);
    });
  }
}
