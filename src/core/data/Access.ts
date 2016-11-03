/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Sequelize from 'sequelize';

export interface AccessInterface<T>{
	byId: ( identifier?: number | string, options?: Sequelize.FindOptions ) => Promise<T>;
	one: ( options? : Sequelize.FindOptions ) => Promise<any>;
	all: ( options? : Sequelize.FindOptions ) => Promise<any[]>;
}

export default class Access<T>{

	actor: any;
	model: Sequelize.Model<any, any>;

	constructor( actor: any, model: Sequelize.Model<any, any> ){
		this.actor = actor,
		this.model = model;
	}

	getInterface(): AccessInterface<T>{
		return {
			byId: this.findById.bind( this ),
			one: this.findOne.bind( this ),
			all: this.findAll.bind( this )
		};
	}

	createActor( data: any ): any{
		let actorInstance: any = new this.actor();
		for( let dataKey in data ){
			let dataValue: any = data[ dataKey ];
			actorInstance.set( dataKey, dataValue );
		}
		return actorInstance;
	}

	handleSingleDataInstance( instance: any, resolve: any, reject: any ): void{
		if( instance ){
			let dataValues: any = instance.dataValues;
			if( !dataValues ){
				reject( new Error( `No data returned.` ) );
			}else{
				let actorInstance: any = this.createActor( dataValues );
				resolve( actorInstance );
			}
		}else{
			reject( new Error( `No results found.` ) );
		}
	}

	findById( identifier?: number | string, options?: Sequelize.FindOptions ) : Promise<T>{
		return new Promise<T>( ( resolve, reject ) => {
			this.model.findById( identifier, options )
				.then( ( instance: any ) => {
					this.handleSingleDataInstance( instance, resolve, reject );
				})
				.catch( ( error: any ) => reject );
		});
		
	}

	findOne( options? : Sequelize.FindOptions ) : Promise<any>{
		return new Promise<T>( ( resolve, reject ) => {
			this.model.findOne( options )
				.then( ( instance: any ) => {
					this.handleSingleDataInstance( instance, resolve, reject );
				})
				.catch( ( error: any ) => reject );
		})
	}

	findAll( options? : Sequelize.FindOptions ) : Promise<any[]>{
		return this.model.findAll( options );
	}
}