const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')

const config = require('./config/key')

const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => {
  console.log(err); console.log(config.mongoURI)
  
})

app.get('/', (req, res) => {
  res.send('Hello World!~~새해복 많이 받으세요')
})

app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

