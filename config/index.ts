import {application} from './application.config';

import * as local from './environments/aat.config';
import * as aat from './environments/aat.config';
import * as process from 'process';

const configs = {
    local,
    // aat,
    microservice: 'jui_webapp',
    idam_client: 'juiwebapp',
    oauth_callback_url: 'oauth2/callback',
    protocol: 'https'
};

export const configEnv = process ? process.env.APP_ENV || 'local' : 'local';
console.log('Using ' + configEnv + ' config file');
export const config = { ...configs[configEnv].default, ...application };

if (configEnv === 'local') {
    config.protocol = 'http';
}

