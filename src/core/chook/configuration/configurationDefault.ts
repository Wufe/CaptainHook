/// <reference path="../../../../typings/index.d.ts" />

import * as Crypto from 'crypto';

import {ConfigurationContentType} from './ConfigurationType';

let jwtSecret: string = Crypto.randomBytes( 32 ).toString( 'hex' );
let securityToken: string = Crypto.randomBytes( 32 ).toString( 'hex' );
let configuration: ConfigurationContentType = {
	gui: false,
	debug: false,
	server: {
		hostname: '0.0.0.0',
		port: 2555
	},
	security: {
		jwt: {
			secret: `${jwtSecret}`,
			expiration_hours: 1
		},
		token: `${securityToken}`
	}
};

export default configuration;