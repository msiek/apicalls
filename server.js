const express = require('express');
const index = require('./routes').router;
const app = express();
const port = process.env.PORT || 8080;

app.use('/', index);
app.listen(port);

console.log(`Server started and listening on http://localhost:${port}`);