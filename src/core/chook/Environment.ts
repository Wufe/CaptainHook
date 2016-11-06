/// <reference path="../../../typings/index.d.ts" />

import * as Path from 'path';
import * as Fs from 'fs';
import * as Utils from './Utils';

const Package = require( '../../../package.json' );

const circleCIBuildPath = '/home/ubuntu/CaptainHook/build';

class Environment{

	projectRoot: string;
	buildDirectory: string;
	quiet: boolean = false;
	package: any = {};

	constructor(){
		this.checkDebugEnvironment();
		this.checkBuildDirectory();
		this.checkProjectRoot();
		this.checkPackage();
	}

	private checkDebugEnvironment(): void{
		// TODO
	}

	private checkBuildDirectory(): void{
		let isMocha: boolean = process.env.NODE_ENV == 'mocha';
		let isCircleCI: boolean = process.env.NODE_ENV == 'circleci';
		let args: string[] = process.argv;
		let scriptPath: string = args[1];
		let realPath = Fs.realpathSync( scriptPath );
		if( isMocha ){
			this.buildDirectory = Path.resolve( Path.join( Path.dirname( realPath ), '..', '..', '..', 'build' ) );
		}else if( isCircleCI ){
			this.buildDirectory = circleCIBuildPath;
		}else{
			this.buildDirectory = Path.resolve( Path.join( Path.dirname( realPath ), '..' ) );
		}
	}

	private checkProjectRoot(): void{
		let projectRoot: string = Path.resolve( Path.join( this.buildDirectory, '..' ) );
		this.projectRoot = projectRoot;
	}

	private checkPackage(): void{
		this.package = Package;
		this.package.get = ( ...keys: string[] ): any => {
			return Utils.getNestedValue( this.package, ...keys );
		};
	}

	public get( ...keys: any[] ): any{
		return Utils.getNestedValue( this, ...keys );
	}

	public set( value: any, ...keys: any[] ): void{
		Utils.setNestedValue( this, value, ...keys );
	}

}

const environment: Environment = new Environment();
export default environment;