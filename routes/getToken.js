var express = require('express');
var router = express.Router();

var https = require('https');
var url = require('url');
var firebase = require('firebase');

// getToken page

router.post('/', function (req, res, next) {
  var headerUrl = req.body["X-Auth-Service-Provider"];
  var credentials = req.body["X-Verify-Credentials-Authorization"];
  if (headerUrl == null || credentials == null) {
   return res.status(400).send("No parameters. Please send proper parameters.");
  } else {

    getDigitsUserId(headerUrl, credentials, function (err,response) {

      if(err != null ) return res.status(400).send("Invalid Data");

      var id = response['id_str'];
      // console.log(id);
      if (id == null) {
       return res.status(400).send("Invalid data");
      }
       var token = firebase.auth().createCustomToken(id);

      res.send(token);

    });

    // console.log("Url: " + headerUrl);
    // console.log("cred: " + credentials);
    // console.log(req.body);
    // res.send(req.body);
  }
});

function getDigitsUserId(headerUrl, credentials, callback) {

  var urlObj = url.parse(headerUrl);
  // console.log(urlObj);
  var options = {
    host: urlObj.host,
    path: urlObj.path,
    headers: {
      "Authorization": credentials
    }
  };

  var req = https.request(options, function (res) {

    // console.log('statusCode: ', res.statusCode);
    // console.log('headers: ', res.headers);


    res.on('data', function (d) {
      // process.stdout.write(d);
      // console.log(JSON.parse(d));
     return callback(null,JSON.parse(d));
    });

  });
/*
req.on('socket', function (socket) {
    socket.setTimeout(10000);
    socket.on('timeout', function() {
        req.abort();
    });
});*/

    req.on('error', function (e) {
      console.log('error');
     return callback(e);
    });

      req.end();



}
module.exports = router;
