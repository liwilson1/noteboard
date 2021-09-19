const express = require('express')
const app = express()
app.use(express.json())

const posts = require('./routes/api/posts')

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(express.static('public'))
app.use('/api/posts', posts);
app.listen(5000)