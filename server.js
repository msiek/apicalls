require('request')
const request = require('request-promise-native')
const clientID = 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z'
const clientSecret = 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR'
const limit = 10
let lat = 33.743629
let long = -78.900706
const location ='wafflehouse'
const where = 'Waffle House'
const version ='20170801'
const baseFourSqURL = 'https://api.foursquare.com/v2/venues'
const results = []


var express = require('express');
var app     = express();
var port    = 	process.env.PORT || 8080;


function wafflehouse(lat, long, cb) {
    const url = `${baseFourSqURL}/search?ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=${version}&query=${location}&limit=${limit}`
    request.get(url, function (err, res, body) {
        if (err) {
            console.log(err)
        } else {
            const wf = JSON.parse(body)
            for (i = 0; i < limit; i++) {
                const distance = wf.response.venues[i].location.distance / 1609.344
                const name = wf.response.venues[i].name
                const addr = wf.response.venues[i].location.address
                const phone = wf.response.venues[i].contact.formattedPhone
                if (name == where) {
                    model = {
                        Name: name,
                        Address: addr,
                        Phone: phone,
                        Distance: distance.toFixed(2)
                    }
                }
                results.push(model)
            }
            cb(results)
        }
    })
}
app.get('/wafflehouse', function (req, res) {
    const latitude = req.query.lat
    const longitude = req.query.long
    wafflehouse(latitude,longitude,function (wf) {
        res.json(wf)
    })
})
// START THE SERVER
// ==============================================
app.listen(port);
console.log('Server Starts on Port: ' + port);
