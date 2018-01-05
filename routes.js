const express    = require('express')
const json2csv   = require('nice-json2csv')
const wf         = require('./wafflehouseAPI')
const controller = require('./controller/index')
const router     = express.Router()
const app        = express
const lat        =  33.743629
const long       = -78.900706

//app.use(json2csv.expressDecorator)
router.get('/wafflehouse/search', controller.search)
router.get('/csv', controller.csv)
router.get('/wafflehouse', controller.waffles)
router.get('/', controller.world)

module.exports.router = router