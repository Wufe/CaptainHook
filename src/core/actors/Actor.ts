/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

export default class Actor<T>{
	
	model: Sequelize.Model<any, any>;
	private data: any;
	protected hidden: string[] = [];

	constructor( model: Sequelize.Model<any, any>, data: any ){
		this.model = model;
		this.data = data;
	}

	get( key?: string ): any{
		if( !key )
			return this.getVisibleData();
		return this.data[ key ];
	}

	getVisibleData(): any{
		let visibleData: any = {};
		for( let dataKey in this.data ){
			if( this.hidden.indexOf( dataKey ) == -1 ){
				visibleData[ dataKey ] = this.data[ dataKey ];
			}
		}
		return visibleData;
	}

	set( key: string, value: any ): void{
		this.data[ key ] = value;
	}

	delete(): Promise<any>{
		return new Promise( ( resolve, reject ) => {
			if( !this.data.id )
				throw new Error( `No id specified.` );
			let {id} = this.data;
			this.model.destroy({
				where: {
					id
				}
			})
			.then( ( rows: number ) => {
				resolve( rows );
			})
			.catch( ( error: any ) => {
				reject( error );
			})
		});
	}

	save(): Promise<T>{
		return new Promise( ( resolve, reject ) => {
			if( this.data.id ){
				this
				.update()
				.then( () => {
					resolve( this );
				})
				.catch( ( error: any ) => {
					this.create()
						.then( () => {
							resolve( this );
						})
						.catch( ( error: any ) => {
							reject( error );
						});
				});
			}else{
				this.create()
					.then( () => {
						resolve( this );
					})
					.catch( ( error: any ) => {
						reject( error );
					});
			}
		});
	}

	private update(): Promise<any>{
		return this.model.update( this.data, {
			where: {
				id: this.data.id
			}
		});
	}

	private create(): Promise<any>{
		return new Promise<void>( ( resolve, reject ) => {
			this.model.create( this.data )
				.then( ( instance: any ) => {
					if( !instance.dataValues )
						throw new Error( `No data returned.` );
					this.populateFromData( instance.dataValues );
					resolve();
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}

	private populateFromData( data: any ): void{
		for( let dataKey in data ){
			let dataValue: any = data[ dataKey ];
			this.set( dataKey, dataValue );
		}
	}

}