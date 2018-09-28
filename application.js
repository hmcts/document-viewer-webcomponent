const apiRoute = require('./api');
const serviceTokenMiddleware = require('./api/middleware/service-token');
const config = require('./config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/oauth2/callback', apiRoute);
app.get('/logout', apiRoute);

app.use(serviceTokenMiddleware);
app.use('/api', apiRoute);

// app.use('/*', (req, res) => {
//     console.time(`GET: ${req.originalUrl}`);
//     // res.render('./dist/index', {
//     //     req,
//     //     res,
//     //     providers: [
//     //         { provide: 'REQUEST', useValue: (req) },
//     //         { provide: 'RESPONSE', useValue: (res) }
//     //     ]
//     // });
//     console.timeEnd(`GET: ${req.originalUrl}`);
// });


app.listen(process.env.PORT || 3000, () => {});

module.exports.app;