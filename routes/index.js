var express = require('express');
var router = express.Router();

/* Indicamos que al entrar a "/" redireeccione al login*/
router.get('/', function(req, res, next) {
  res.redirct('index', "admin/login");
});

module.exports = router;
