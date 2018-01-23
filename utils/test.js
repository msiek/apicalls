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

const foursquareParams = {
    client_id: 'GRGLBQDIY40TNUGKHJAPFOJAV0ZQF1ZZ1ASAGU14C4VGQI2Z',
    client_secret: 'ZOEYJUIIE2BT0DMFPYXHIBB0M0XTJ33ILIANKPIH4BSKCSWR',
    query: 'wafflehouse',
    v: '20170801',
    limit: 10
};

exports.waffleHouseLookup = function (lat, long) {
    const params = qs.stringify(Object.assign({
        ll: `${lat},${long}`
    }, foursquareParams));

    const url = `${baseFourSqURL}/search?${params}`;

    return new Promise((resolve, reject) => {
        request.get(url)
            .then(body => {
                try {
                    return JSON.parse(body).response.venues.map(venue => {
                        return {
                            name: venue.name,
                            address: {
                                street: venue.location.address,
                                postalcode: venue.location.postalCode,
                                city: venue.location.city,
                                state: venue.location.state,
                                country: venue.location.country,
                                country_code: venue.location.cc,
                                formatted: venue.location.formattedAddress,
                                lat: venue.location.lat,
                                lng: venue.location.lng,
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
            .then(geocodeWaffles).then(data => {
                console.log(data); return data;
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

const geocodeWaffles = function (venues){
    const venuesPromises = venues.map(venue => {
        return geocoder.reverse({lat:venue.address.lat, lon: venue.address.lng})
            .then((res)=>{
                const formatted_address = res[0].formattedAddress;
                const streetNumber = res[0].streetNumber;
                const streetName = res[0].streetName;
                const lat = res[0].latitude.toFixed(6);
                const lng = res[0].longitude.toFixed(6);
                const city = res[0].city;
                const postalcode = res[0].zipcode;
                const country = res[0].country;
                const state = res[0].administrativeLevels.level1short;
                const country_code = res[0].countryCode;

                return Object.assign(venue, {
                    address: {
                        address:  `${streetNumber} ${streetName}`,
                        postalcode,
                        city,
                        state,
                        country,
                        country_code,
                        formatted_address,
                        lat,
                        lng
                    }
                });
            })
            .catch((err)=>{
                console.log(err)
            });
    });

    return Promise.all(venuesPromises);

}








