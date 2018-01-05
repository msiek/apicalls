const wf       = require('../wafflehouseAPI');
const json2csv = require('nice-json2csv')
const express  = require('express')
const lat      =  33.743629;
const long     = -78.900706;
const app      = express;


exports.waffles = (req, res) => {
    const latitude = req.query.lat
    const longitude = req.query.long
    if(latitude != " " && longitude != " "){
        wf.waffles(lat,long, (call)=> {
            res.json(call)
        })
    }else {
        wf.waffles(latitude, longitude, (call) => {
            res.json(call)
        })
    }
}

exports.world = (req, res) => {
    res.send('<h1>Hello World</h1>')
}

exports.csv = (req,res) => {
    const latitude = req.query.lat
    const longitude = req.query.long
    wf.waffles(latitude,longitude,(call) => {
        res.csv(call,'wafflehouse.csv')
    })
}
