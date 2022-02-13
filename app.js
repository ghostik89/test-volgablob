const express = require('express')
const app = express()
const routes = require('./routes')

const port = 3000

app.use('/api/v1/comments/', routes)
app.listen(port, () => console.log('app started'))
