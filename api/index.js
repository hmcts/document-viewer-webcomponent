const express = require('express');

const router = express.Router();
const annotationRoutes = require('./annotations');
const authInterceptor = require('./middleware/auth');

// auth(router);
router.use(authInterceptor);
annotationRoutes(router);

module.exports = router;