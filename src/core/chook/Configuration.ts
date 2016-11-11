/// <reference path="../../../typings/index.d.ts" />

import * as Crypto from 'crypto';

interface ConfigurationContentType{
	gui: boolean;
	debug: boolean;
	server: {
		hostname: string;
		port: number;
	};
	security: {
		jwt: {
			secret: string;
			expiration_hours: number;
		};
		token: string;
	};
}

interface ConfigurationType{
	store: "memory" | "file";
	filename: string;
	directory: string;
	filepath: string;
	content: ConfigurationContentType;
}

let jwtSecret: string = Crypto.randomBytes( 32 ).toString( 'hex' );
let securityToken: string = Crypto.randomBytes( 32 ).toString( 'hex' );
let defaultConfiguration: ConfigurationContentType = {
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
export {
	ConfigurationContentType,
	ConfigurationType,
	defaultConfiguration
}