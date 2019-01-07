const apiRoute = require('./api');
const serviceTokenMiddleware = require('./api/middleware/service-token');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(serviceTokenMiddleware);
app.use('/api', apiRoute);

app.listen(process.env.PORT || 3001, () => console.log('Example app listening on port 3001!'));

module.exports.app;