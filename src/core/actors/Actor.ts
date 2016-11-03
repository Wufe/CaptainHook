/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Sequelize from 'sequelize';

export default class Actor<T>{
	
	model: Sequelize.Model<any, any>;
	data: any;

	constructor( model: Sequelize.Model<any, any>, data: any ){
		this.model = model;
		this.data = data;
	}

	get( key: string ): any{
		return this.data[ key ];
	}

	set( key: string, value: any ): void{
		this.data[ key ] = value;
	}

	save(): Promise<T>{
		return new Promise( ( resolve, reject ) => {
			this.model.create( this.data )
				.then( ( instance: any ) => {
					this.handleSingleDataInstance( instance, resolve, reject );					
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}

	private handleSingleDataInstance( instance: any, resolve: any, reject: any ): void{
		let dataValues: any = instance.dataValues;
		if( !dataValues ){
			reject( new Error( `No data returned.` ) );
		}else{
			this.populateFromData( dataValues );
			resolve( this );
		}
	}

	private populateFromData( data: any ): void{
		for( let dataKey in data ){
			let dataValue: any = data[ dataKey ];
			this.set( dataKey, dataValue );
		}
	}

}