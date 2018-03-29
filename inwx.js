var request = require('request');
var builder = require('xmlbuilder');

module.exports = class {
  apiNameserverUpdateRecord(INWX_USER, INWX_PASS, INWX_DOMAIN_ID, WAN_IP) {
    return builder.create('methodCall')
      .ele('methodName', 'nameserver.updateRecord').up()
        .ele('params')
          .ele('param')
            .ele('struct')
              .ele('memeber')
                .ele('name', 'user').up()
                .ele('value')
                  .ele('string', INWX_USER).up()
                .up()
              .up()
              .ele('memeber')
                .ele('name', 'pass').up()
                .ele('value')
                  .ele('string', INWX_PASS).up()
                .up()
              .up()
              .ele('memeber')
                .ele('name', 'id').up()
                .ele('value')
                  .ele('string', INWX_DOMAIN_ID).up()
                .up()
              .up()
              .ele('memeber')
                .ele('name', 'content').up()
                .ele('value')
                  .ele('string', WAN_IP).up()
                .up()
              .up()
            .up()
          .up()
        .up()
      .end({pretty : true});
  }

  sendRequest(xml) {
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
