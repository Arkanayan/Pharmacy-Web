var express = require('express');
var router = express.Router();

// Get getToken page

router.get('/', function (req, res, next) {
   res.send("This is getToken page");
});

module.exports = router;