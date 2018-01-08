const express = require('express');
const controller = require('./controllers');

const router = express.Router();

router.get('/wafflehouse', controller.waffles);
router.get('/csv', controller.csv);
router.get('/', controller.homepage);

module.exports.router = router;