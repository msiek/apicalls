const express = require('express')
const router = express.Router()
const app = express
const json2csv = require('nice-json2csv')
const wf = require('./wafflehouseAPI')
const lat           =  33.743629
const long          = -78.900706

app.use(json2csv.expressDecorator)
router.get('/wafflehouse/search', (req, res) => {
    const latitude = req.query.lat
    const longitude = req.query.long
    wf.waffles(latitude, longitude, (call) => {
        res.json(call)
    })
})
router.get('/csv', (req,res) => {
    const latitude = req.query.lat
    const longitude = req.query.long
    wf.waffles(latitude,longitude,(call) => {
        res.csv(call,'wafflehouse.csv')
    })
})
router.get('/wafflehouse', (req, res) => {
    wf.waffles(lat, long, (call) => {
        res.json(call)
    })
})
router.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

module.exports.router = router