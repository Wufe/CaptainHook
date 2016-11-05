/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Authentication, Credentials} from '../../../src/core/auth';

describe( `Authentication`, () => {
	let credentials: Credentials = {
		username: 'admin',
		password: 'admin'
	};
	let authentication: Authentication = new Authentication( credentials );
});