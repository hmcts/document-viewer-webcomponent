const express = require('express');

const router = express.Router();
const annotationRoutes = require('./annotations');
const authInterceptor = require('./middleware/auth');

router.use(authInterceptor);
annotationRoutes(router);

module.exports = router;