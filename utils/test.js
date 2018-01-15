const apiKey = 'AIzaSyD9k0r4o0XKwWQgPgL5r1eX1dvFJt2Zxyw';
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: apiKey
};
const geocoder = NodeGeocoder(options)

require('request');
const request = require('request-promise-native');
const qs = require('querystring');
const baseFourSqURL = 'https://api.foursquare.com/v2/venues';

const forsquareParams = {
    client_id: 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z',
    client_secret: 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR',
    query: 'wafflehouse',
    v: '20170801',
    limit: 10
};
exports.waffleHouseLookup = function test(lat, long) {
    const params = qs.stringify(Object.assign({
        ll: `${lat},${long}`
    }, forsquareParams));

    const url = `${baseFourSqURL}/search?${params}`;

    return new Promise((resolve, reject) => {
        request.get(url)
            .then(body => {
                try {
                    return JSON.parse(body).response.venues.map(venue => {
                        latitude = venue.location.lat
                        longitude = venue.location.lng
                        console.log(wf(latitude, longitude))
                        return {
                            name: venue.name,
                            address: {
                                test
                            },
                            phone: venue.contact.formattedPhone,
                            distance: ( venue.location.distance / 1609.344 ).toFixed(2),
                            meta: {
                                //...venue
                            }
                        };
                    });
                } catch (err) {
                    return reject({
                        url,
                        error: err,
                    });
                }
            })
            .then(resolve)
            .catch(err => {
                return reject({
                    url,
                    error: err,
                })
            });
    });
};


function wf(lat, long){
        geocoder.reverse({lat:lat, lon:long})
        .then((res)=>{
            formattedAddress = res[0].formattedAddress
            streetNumber = res[0].streetNumber
            streetName = res[0].streetName
            la = res[0].latitude.toFixed(6)
            lng = res[0].longitude.toFixed(6)
            cityName = res[0].city
            postalCode = res[0].zipcode
            country = res[0].country
            state = res[0].administrativeLevels.level1short
            countryCode = res[0].countryCode
            street = `${streetNumber} ${streetName}`
            addr = {
                address: street,
                postalcode: postalCode,
                city: cityName,
                state: state,
                country: country,
                country_code: countryCode,
                formatted_address: formattedAddress,
                lat: la,
                lng: lng
            }
            console.log(addr)
            return addr
        })
        .catch((err)=>{
            console.log(err)
        })
}
