require('request')
const request = require('request-promise-native')
const distanceAPIKey = 'AIzaSyBztF-VWWU69iGEZWaK0EA6UiTTUD30Xbg'
const clientID = 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z'
const clientSecret = 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR'
const baseGoogleURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
const baseFourSqURL = 'https://api.foursquare.com/v2/venues'
const lat = 33.743629
const long = -78.900706
let wflat = ''
let wflong = ''
const location = 'wafflehouse'
const where = 'Waffle House'
const version = '20170801'
const limit = 10
const fourSqURL = `${baseFourSqURL}/search?ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=${version}&query=${location}&limit=${limit}`

function wafflehouse() {
    request.get(fourSqURL, function (err, res, body){
        if(err) {
            console.log(err)
        }else {
            const wf = JSON.parse(body)
            for(i=0; i<limit; i++) {
                wflat = wf.response.venues[i].location.lat
                wflong = wf.response.venues[i].location.lng
                googleURL = `${baseGoogleURL}&origins=${lat},${long}&destinations=${wflat},${wflong}&key=${distanceAPIKey}`
                if(wf.response.venues[i].location.lat && wf.response.venues[i].location.lng ==' '){

                }else {
                        request.get(googleURL, function (err, res, body){
                            const time = JSON.parse(body)
                            const locate = time.destination_addresses[0]
                            const distance = time.rows[0].elements[0].distance.text
                            const eta = time.rows[0].elements[0].duration.text
                            console.log(`Name: ${where}\nAddress: ${locate}\nDistance: ${distance} \nETA: ${eta}\n`)
                        })
                    }
                }
            }
    })
}
console.log(fourSqURL)