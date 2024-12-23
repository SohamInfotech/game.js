var express = require('express');
var router = express.Router();
const LS = require('../controller/user')

router.post('/createUser',  LS.createUser);
router.post('/userLogin',  LS.userLogin);

module.exports = router;