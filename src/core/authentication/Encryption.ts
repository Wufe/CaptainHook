/// <reference path="../../../typings/globals/bcrypt/index.d.ts" />

import * as Bcrypt from 'bcrypt';

const saltRounds = 12;

export default class Encryption{

	plainData: string;

	constructor( plainData: string ){
		this.plainData = plainData;
	}

	getHash(): string{
		return Bcrypt.hashSync( this.plainData, saltRounds );
	}

	compare( hashedData: string ): boolean{
		return Bcrypt.compareSync( this.plainData, hashedData );
	}

}