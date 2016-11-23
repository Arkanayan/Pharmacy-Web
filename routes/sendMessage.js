var express = require('express');
var router = express.Router();

var firebase = require('firebase');

var gcm = require('node-gcm');

router.post('/', function (req, res, next) {

  var registrationToken = req.body['reg_token'];
  var messageTitle = req.body['msg_title'];
  var messageBody = req.body['msg_body'];
  var orderId = req.body['order_id'];

  console.log("reg token: " + registrationToken);
  console.log("title: " + messageTitle);
  console.log("body: " + messageBody);
  console.log("order ID: " + orderId);
  if (registrationToken == null || messageTitle == null || messageBody == null || orderId == null) {
    return res.status(400).send("No parameters. Please send proper parameters.");
  }

/*  var user = firebase.auth().signInWithCustomToken(authToken);

  user.then(function (user) {

    var database = firebase.database();

    database.ref('configs/roles/admin' + user.uid).once('value').then(function (snapshot) {
      if(!snapshot.exists()) {
        return res.send(403).send("Sorry, you are not admin");
      }*/

      // send message
      //TODO Enter FCM sender token here
      var sender = new gcm.Sender('YOUR FCM SENDER TOKEN');
      var regTokens = [registrationToken];

      var message = new gcm.Message({
        data: {
          'order_id': orderId,
          'type': "ORDER_UPDATE"
        },
        notification: {
          title: messageTitle,
          body: messageBody,
          sound: 'default',
          icon: 'pill_icon'
        }
      });

      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err) {
          console.error(err);
          return res.status(400).send(err);
        }
        else  {
          console.log(response);
          return res.send(response);
        }
      });

/*    }).catch(function (err) {
      console.log("Auth error: " + err);
      return res.send(403).send("Unable to authenticate");
    });

  }, function (error) {
    return res.send(403).send("Unable to resolve user");

  });*/

});



module.exports = router;
