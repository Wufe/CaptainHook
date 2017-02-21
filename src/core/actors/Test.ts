/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';

const model = Database.models.test;

interface TestData{
	test?: string;
}

class Test extends Actor<Test>{

	static find: AccessInterface<Test>;

	constructor( data: TestData ){
		super( model, data );
	}

}

Test.find = ( new Access( Test, model ) ).getInterface();

export default Test;