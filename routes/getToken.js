var express = require('express');
var router = express.Router();

var https = require('https');
var url = require('url');
var firebase = require('firebase');

firebase.initializeApp({
  serviceAccount: __dirname + "/AhanaPharmacy.json",
  databaseURL: "https://ahana-pharmacy-ffe04.firebaseio.com"
      });
// Get getToken page

router.post('/', function (req, res, next) {
  var headerUrl = req.body["X-Auth-Service-Provider"];
  var credentials = req.body["X-Verify-Credentials-Authorization"];
  if (headerUrl == null && credentials == null) {
    res.status(400).send("not found");
  } else {

    getDigitsUserId(headerUrl, credentials, function (response) {
      var id = response['id_str'];
      // console.log(id);
      if (id != null) {


      var token = firebase.auth().createCustomToken(id);

      res.send(token);
      } else {
        res.send("Invalid data").sendStatus(400);
      }

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
      callback(JSON.parse(d));
    });

  });


    req.on('error', function (e) {
      callback(d);
    });

      req.end();


}
module.exports = router;
