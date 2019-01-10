const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');


function getDocument(uuid, options) {
    return generateRequest('GET', `${config.services.dm_store_api}/documents/${uuid}`, options);
}

function getDocumentBinary(documentId, options) {
    return generateRequest('GET', `${config.services.dm_store_api}/documents/${documentId}/binary`, options)
}

function uploadDocument(options) {
    return generateRequest('POST', `${config.services.dm_store_api}/documents`, options)
}

function getOptions(req) {
    return {
        headers: {
            'user-roles': 'caseworker',
            Authorization: `${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        },
        body: req.body
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/documents', router);

    router.post('/', (req, res, next) => {
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

    router.get('/:documentId/binary', (req, res, next) => {
        const options = getOptions(req);
        const documentId = req.params.documentId;
        getDocumentBinary(documentId, options).pipe(res)
    });

    router.get('/:uuid', (req, res, next) => {
        const options = getOptions(req);
        const uuid = req.params.uuid;
        getDocument(uuid, options)
            .then(response => {
                console.log(response);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });
};
