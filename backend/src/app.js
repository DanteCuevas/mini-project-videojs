const express = require('express')
const bodyParser = require('body-parser')
const routers = require('./routers')
const cors = require('cors')
const { SingletonMongoDB } = require('./databases/mongodb');

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(routers)
SingletonMongoDB.getInstance()

module.exports = app
