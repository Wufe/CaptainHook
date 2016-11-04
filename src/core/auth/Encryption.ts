/// <reference path="../../../typings/globals/bcrypt/index.d.ts" />

import * as Bcrypt from 'bcrypt';

const saltRounds = 12;

export default class Encryption{

	plainData: string;

	constructor( plainData: string ){
		this.plainData = plainData;
	}

	getHash(): string{
		let alreadyHashed: boolean = this.checkAlreadyHashed();
		if( !alreadyHashed ){
			return Bcrypt.hashSync( this.plainData, saltRounds );	
		}else{
			return this.plainData;
		}
	}

	checkAlreadyHashed(): boolean{
		try{
			let rounds: number = Bcrypt.getRounds( this.plainData );
			return true;
		}catch( error ){
			return false;
		}
	}

	compare( hashedData: string ): boolean{
		return Bcrypt.compareSync( this.plainData, hashedData );
	}

}