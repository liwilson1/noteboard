const express = require('express')
const app = express()
app.use(express.json())

const posts = require('./routes/api/posts')

app.get('/', function (req, res) {
  res.redirect('/index.html')
})

app.use(express.static('public'))
app.use('/api/posts', posts);
app.listen(5000)