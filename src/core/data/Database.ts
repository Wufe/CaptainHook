/// <reference path="../../../typings/globals/node/index.d.ts" />
/// <reference path="../../../typings/globals/sequelize/index.d.ts" />

import {getBuildDirectory} from '../chook/';

import * as Models from './models';
import * as Path from 'path';
import * as Sequelize from 'sequelize';

export class Database{

	sequelize: Sequelize.Sequelize;
	models: any = {};

	constructor(){
		this.setupDatabaseConnection();
		this.setupModelDefinitions();
	}

	setupDatabaseConnection(): void{
		let databaseFileName: string = 'database.sqlite';
		if( process.env.NODE_ENV == 'mocha' ||
			process.env.NODE_ENV == 'circleci' ||
			process.env.NODE_ENV == 'test' ){
			databaseFileName = 'database.test.sqlite';
		}
		let databaseFilePath = Path.join( getBuildDirectory(), 'resources', databaseFileName );
		this.sequelize = new Sequelize( null, null, null, {
			dialect: 'sqlite',
			storage: databaseFilePath,
			logging: false
		});
	}

	setupModelDefinitions(): void{
		let availableModels: any;
		availableModels = Models;
		for( let key in availableModels ){
			let modelName: string = key;
			let modelAttributes: any = availableModels[ modelName ]( Sequelize );
			let modelTimestamps: any = this.getTimestampsFromAttributes( modelAttributes );
			this.models[ modelName ] = this.sequelize.define(
				modelName,
				modelAttributes,
				modelTimestamps
			);
		}
	}

	getTimestampsFromAttributes( attributes: any ){
		let timestamps: any = {};
		let isThereCreationTimestamp: boolean = attributes.created_at ? true : false;
		let isThereUpdateTimestamp: boolean = attributes.updated_at ? true : false;
		if( isThereCreationTimestamp || isThereUpdateTimestamp )
			timestamps.timestamps = true;
		if( isThereCreationTimestamp )
			timestamps.createdAt = 'created_at';
		if( isThereUpdateTimestamp )
			timestamps.updatedAt = 'updated_at';
		return timestamps;
	}

}

const database: Database = new Database();
const models = database.models;
export {
	database,
	models
}
export default database;