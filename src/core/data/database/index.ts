/// <reference path="../../../../typings/globals/node/index.d.ts" />
/// <reference path="../../../../typings/globals/sequelize/index.d.ts" />

import Environment from '../../chook/Environment';

import * as Path from 'path';
import * as Sequelize from 'sequelize';

export class Database{

	sequelize: Sequelize.Sequelize;

	constructor(){
		this.setupDatabaseConnection();
		this.testConnection();
	}

	setupDatabaseConnection(): void{
		let databaseFilePath = Path.join( Environment.buildDirectory, 'resources', 'database.sqlite' );
		this.sequelize = new Sequelize( databaseFilePath );
	}

	testConnection(): void{
		this.sequelize
			.authenticate()
			.then(() => {
				console.log( 'Authenticated' );
			})
			.catch(( error: any ) => {
				console.log( 'Cannot authenticate into the database.' );
				console.log( error );
			});
	}

}

const database: Database = new Database();
export default database;