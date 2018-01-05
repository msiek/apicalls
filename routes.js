const express    = require('express')
const controller = require('./controller/index')
const router     = express.Router()
const app        = express

// app.use(json2csv.expressDecorator)

router.get('/wafflehouse', controller.waffles)
router.get('/csv', controller.csv)
router.get('/', controller.world)

module.exports.router = router