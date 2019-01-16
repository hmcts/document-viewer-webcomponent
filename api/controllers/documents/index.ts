import * as express from 'express'
const { getDocument, getDocumentBinary, postDocument } = require('../../services/dm-store-api/dm-store-api')
const headerUtilities = require('../../lib/utilities/headerUtilities')

function getOptions(req) {
    return headerUtilities.getAuthHeadersWithUserRoles(req)
}

module.exports = app => {
    const route = express.Router({ mergeParams: true })
    app.use('/documents', route)

    route.get('/:document_id', (req, res, next) => {
        getDocument(req.params.document_id, getOptions(req)).pipe(res)
    })

    route.get('/:document_id/binary', (req, res, next) => {
        getDocumentBinary(req.params.document_id, getOptions(req))
            .on('response', response => {
                response.headers['content-disposition'] = `attachment; ${response.headers['content-disposition']}`
            })
            .pipe(res)
    })

    route.post('/', (req, res, next) => {
      //  uploadDocument().pipe(res)
    })
}
