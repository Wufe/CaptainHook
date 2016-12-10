/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

import {Actor} from '.';

export default class Creator{

	actor: any;

	constructor( actor: any ){
		this.actor = actor;
	}

	makeFromDataInstance( sequelizeInstance: any ): Actor<any>{
		if( !sequelizeInstance )
			throw new Error( `No results found.` );
		if( !sequelizeInstance.dataValues )
			throw new Error( `No data returned.` );
		return this.create( sequelizeInstance );
	}

	create( instance: any ): any{
		let dataValues: any = instance.dataValues;
		let actorInstance: any = new this.actor();
		for( let dataKey in instance.dataValues ){
			let dataValue: any = instance.get( dataKey );
			actorInstance.set( dataKey, dataValue );
		}
		return actorInstance;
	}

}