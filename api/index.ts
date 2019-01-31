import * as express from 'express'
import * as config from '../config'
import { auth } from './controllers/auth'

const router = express.Router()

const authInterceptor = require('./lib/middleware/auth')
const serviceTokenMiddleware = require('./lib/middleware/service-token')
const documentsRoutes = require('./controllers/documents')

const dmStoreApiRoutes = require('./services/dm-store-api/dm-store-api')
const emAnnoApiRoutes = require('./services/em-anno-api/em-anno-api')
const emNpaApiRoutes = require('./services/em-npa-api/em-npa-api')
const idamApiRoutes = require('./services/idam-api/idam-api')
const s2sApiRoutes = require('./services/service-auth-provider-api/service-auth-provider-api')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

router.use(serviceTokenMiddleware)
auth(router)
router.use(authInterceptor)
documentsRoutes(router)

if (config.configEnv !== 'prod') {
    // Uncomment to enable direct access to Microservices
    dmStoreApiRoutes(router)
    idamApiRoutes(router)
    s2sApiRoutes(router)
}

emAnnoApiRoutes(router)
emNpaApiRoutes(router)

module.exports = router
