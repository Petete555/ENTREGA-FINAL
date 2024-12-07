var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirct('index', "admin/login");
});

module.exports = router;
