require('request')
const request       =  require('request-promise-native')
const limit         =  10
const lat           =  33.743629
const long          = -78.900706
const clientID      = 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z'
const clientSecret  = 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR'
const location      = 'wafflehouse'
const where         = 'Waffle House'
const version       = '20170801'
const baseFourSqURL = 'https://api.foursquare.com/v2/venues'

exports.waffles = function wafflehouse(lat, long, cb) {
    const results = []
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
            return cb(results)
        }
    })
}