const api = require('../utils/api');

exports.waffles = (req, res) => {
  const latitude = req.query.lat;
  const longitude = req.query.long;
  if (!latitude && !longitude) {
    res.status(400).send({error: 'Please add latitude (lat) and longitude (long) query params to your url.'});
  } else {
    api.waffleHouseLookup(latitude, longitude)
      .then(body => {
        res.status(200).json(body);
      })
      .catch(err => {
        res.status(400).send({error: err});
      });
  }
};

exports.homepage = (req, res) => {
  res.send('<h1>Try hitting the API.</h1>');
};

exports.csv = (req, res) => {
  api.waffleHouseLookup(req.query.lat, req.query.long)
    .then(call => {
      res.csv(call, 'wafflehouse.csv');
    })
    .catch(err => {
      res.status(400).send({error: err});
    });
};
