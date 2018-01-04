const clientID      = 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z'
const clientSecret  = 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR'
const request = require('request-promise-native')
const Foursq = require('foursquarevenues')
const lat           =  33.743629
const long          = -78.900706
const googleAPI = 'AIzaSyBUPf8aZCPRKL3zZAGvr-FK3MiYFQ6sEUw'
const NodeGeocoder = require('node-geocoder')
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: googleAPI,
}
const geocoder = NodeGeocoder(options)
geocoder.reverse({lat:lat, lon:long}, function(err, res) {
    const test = res
    return test
});

console.log(test)