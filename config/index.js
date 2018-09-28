const applicationConfig = require('./application.config');

const config = {
    local: require('./environments/local.config.js')
};

const configEnv = typeof (process) !== 'undefined' ? (process.env.JUI_ENV || 'local') : 'local';
console.log('Using', configEnv, 'Config');

module.exports = Object.assign(applicationConfig, config[configEnv]);
