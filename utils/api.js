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
            result = {
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
              return result
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
