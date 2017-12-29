require('request')
const request = require('request-promise-native')
const root = 'https://data.townofcary.org/api/records/1.0/search/?dataset=permit-inspections&sort=-permitnum&facet=description&facet=inspectiontrade&facet=result&facet=resultmapped&facet=inspecteddate&facet=final&facet=applicationtype'
const distanceAPIKey = 'AIzaSyBztF-VWWU69iGEZWaK0EA6UiTTUD30Xbg'
const baseGoogleURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
const bdLat = 35.789474
const bdLng = -78.780546
function permitAPI() {
    request.get(root, function(err, res, body){
        const cary = JSON.parse(body)
        for(i=0; i<5; i++){
            const desc = cary.records[i].fields.applicationdescription
            const lat = cary.records[i].fields.geopoint[0]
            const lng = cary.records[i].fields.geopoint[1]
            const permitType = cary.records[i].fields.permittype
            const result = cary.records[i].fields.result
           console.log(`Permit Type: ${permitType}\nDescription: ${desc}\nResult: ${result}\n`)
            const googleURL = `${baseGoogleURL}&origins=${bdLat},${bdLng}&destinations=${lat},${lng}&key=${distanceAPIKey}`
            request.get(googleURL,function(err, res, body){
                if(err){
                    console.log(err)
                }else {
                    const area = JSON.parse(body)
                    const addr = area.destination_addresses[0]
                    const distance = area.rows[0].elements[0].distance.text
                    const time = area.rows[0].elements[0].duration.text
                    console.log(`Address: ${addr}\nDistance: ${distance}\nTime Saved: ${time}\n`)
                }
            })
        }
    })
}
console.log(body)
permitAPI()