const express = require('express')
var cors = require('cors')
const coonectToMongo=require('./mongodb');
const bodyParser = require('body-parser');

coonectToMongo();
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 4000

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/stories',require('./routes/stories'))


app.listen(port, () => {
  console.log(`Digital Story app listening on port : ${port}`)
})