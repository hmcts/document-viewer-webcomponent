const axios = require('axios');
const jwtDecode = require('jwt-decode');
const config = require('../../config');

module.exports = (req, res, next) => {
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId];
    const jwt = req.headers.authorization || req.cookies[config.cookies.token];
    const jwtData = jwtDecode("eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmM25qNHZkY2RyMjNsNGpxYWI4Nzg4amFtYiIsInN1YiI6IjE5IiwiaWF0IjoxNTQ2ODY4NDcxLCJleHAiOjE1NDY4ODY0NzEsImRhdGEiOiJjYXNld29ya2VyLGNhc2V3b3JrZXItbG9hMCIsInR5cGUiOiJBQ0NFU1MiLCJpZCI6IjE5IiwiZm9yZW5hbWUiOiJJbnRlZ3JhdGlvbiIsInN1cm5hbWUiOiJUZXN0IiwiZGVmYXVsdC1zZXJ2aWNlIjoiUHJvYmF0ZSIsImxvYSI6MCwiZGVmYXVsdC11cmwiOiJodHRwczovL2xvY2FsaG9zdDo5MDAwL3BvYy9wcm9iYXRlIiwiZ3JvdXAiOiJwcm9iYXRlLXByaXZhdGUtYmV0YSJ9.GTvUADbPIrRd2VIyqNC1Fhqju9OIApUvR5Ybtno8PqY");
    const expires = new Date(jwtData.exp).getTime();
    const now = new Date().getTime() / 1000;
    const expired = expires < now;

    if (expired) {
        res.status(401).send('Token expired!');
    } else {
        req.auth = jwtData;
        req.auth.token = jwt;
        req.auth.userId = userId;

        axios.defaults.headers.common.Authorization = `Bearer ${req.auth.token}`
        if (req.headers.ServiceAuthorization) {
            axios.defaults.headers.common.ServiceAuthorization = req.headers.ServiceAuthorization
        }
        next();
    }
};
