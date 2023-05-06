'use strict';
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config');
const dbRoutes = require('./routes/db-routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

app.use('/sca-db-microservice/v1', dbRoutes.routes)

app.listen(config.port, () => console.log('App is listening on url ' + config.url));