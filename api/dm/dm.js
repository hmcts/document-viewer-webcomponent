const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');


function getDocument(uuid, options) {
    console.log(`${config.services.dm_store_api}/documents/${uuid}/binary`);
    return generateRequest('GET', `${config.services.dm_store_api}/documents/${uuid}/binary`, options);
}

function uploadDocument(options) {
    console.log(options.headers);
    return generateRequest('POST', `${config.services.dm_store_api}/documents`, options)
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        },
        body: req.body
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/dm-store', router);

    router.post('/documents', (req, res, next) => {
        const options = getOptions(req);

        uploadDocument( options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message);
            });
    });


    router.get('/documents/:uuid', (req, res, next) => {
        const options = getOptions(req);
        const uuid = req.params.uuid;
        getDocument(uuid, options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });
};
