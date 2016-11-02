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
					let dataValues: any = instance.dataValues;
					if( !dataValues ){
						reject( new Error( `No data returned.` ) );
					}else{
						for( let dataKey in dataValues ){
							let dataValue: any = dataValues[ dataKey ];
							this.set( dataKey, dataValue );
						}
						resolve( this );
					}
				})
				.catch( ( error: any ) => reject );
		})
		
	}

}