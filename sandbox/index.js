const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use('/', router);
app.listen(port);

console.log(`Server started and listening on http://localhost:${port}`);