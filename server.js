require('request')
const index         = require('./routes').router
const express       =  require('express');
const app           =  express();
const port          =  process.env.PORT || 8080;

app.use('/', index)

app.listen(port);
console.log('Server Starts on Port: ' + port);