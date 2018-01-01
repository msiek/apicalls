const express = reqiure('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()
router.get('/fourSqAPI', function(req, res){
    res.send(req.params.lat+req.params.long)
})
app.use('/', router)
app.listen(port)
console.log(port)