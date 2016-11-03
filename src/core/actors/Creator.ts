/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

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
		let dataValues: any = sequelizeInstance.dataValues;
		if( !dataValues )
			throw new Error( `No data returned.` );
		return this.createActorFromData( dataValues );
	}

	createActorFromData( data: any ): any{
		let actorInstance: any = new this.actor();
		for( let dataKey in data ){
			let dataValue: any = data[ dataKey ];
			actorInstance.set( dataKey, dataValue );
		}
		return actorInstance;
	}

}