const express = require('express');

const router = express.Router();
const annotationRoutes = require('./annotations');
const dmRoutes = require('./dm');
const authInterceptor = require('./middleware/auth');

router.use(authInterceptor);
annotationRoutes(router);
dmRoutes(router);

module.exports = router;