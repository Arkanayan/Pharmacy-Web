var express = require('express');
var router = express.Router();
var path = require('path');

/* GET active-orders page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendfile(path.join(__dirname, '..', 'dist/index.html'));
});

module.exports = router;
