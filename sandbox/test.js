const clientID      = 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z'
const clientSecret  = 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR'
const request = require('request-promise-native')
const Foursq = require('foursquarevenues')
const lat           =  33.743629
const long          = -78.900706
const googleAPI = 'AIzaSyBUPf8aZCPRKL3zZAGvr-FK3MiYFQ6sEUw'
const NodeGeocoder = require('node-geocoder')
const geocoder      = require('geocoder')
const results = []

geocoder.reverseGeocode(lat, long, function (err, data) {
    addr = data.results[0].formatted_address
    address = addr
    console.log(address)
    return data(address)

})
