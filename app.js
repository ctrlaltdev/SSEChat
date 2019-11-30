const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.use(express.static('public'))

app.use(routes)

module.exports = app
