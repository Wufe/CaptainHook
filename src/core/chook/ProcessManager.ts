/// <reference path="../../../typings/index.d.ts" />

import {getBuildDirectory, Log, Utils} from '.';

import * as ChildProcess from 'child_process';
import * as Fs from 'fs';
import * as Moment from 'moment';
import * as Path from 'path';
import * as Yaml from 'js-yaml';

export interface Process{
	binary?: string;
	arguments?: string[];
	cwd?: string;
	pid?: number;
	startedAt?: string;
}

export class ProcessManager{

	processInfo: Process;
	defaultArguments: string[] = [];

	constructor( processInfo: Process ){
		if( !processInfo.binary )
			processInfo.binary = process.argv[1];
		if( !processInfo.arguments )
			processInfo.arguments = this.defaultArguments;
		if( !processInfo.cwd )
			processInfo.cwd = Path.dirname( processInfo.binary );
		this.processInfo = processInfo;
	}

	spawnProcess(): void{
		let spawned: ChildProcess.ChildProcess;
		try{
			spawned = ChildProcess.spawn( this.processInfo.binary, this.processInfo.arguments, {
				cwd: this.processInfo.cwd,
				detached: true,
				stdio: 'ignore'
			});
			spawned.unref();
			this.processInfo.pid = spawned.pid;
			this.processInfo.startedAt = ( Moment().format() );
		}catch( error ){
			Log( 'error', `Cannot start the process.`, this.processInfo, error );
		}
	}

	saveProcess( filename: string = 'process.yml' ){
		let filepath: string = Path.join( getBuildDirectory(), 'resources', filename );
		try{
			let yamlProcess: string = Yaml.safeDump( this.processInfo );
			Fs.writeFileSync( filepath, yamlProcess )
		}catch( error ){
			Log( 'error', `Cannot write process information to file [${filename}].`, this.processInfo, error );
		}
	}

	deleteProcess( filename: string = 'process.yml' ){
		let filepath: string = Path.join( getBuildDirectory(), 'resources', filename );
		if( !Utils.isFile( filepath ) ){
			Log( 'warning', `Process information file does not exist [${filename}].` );
			return;
		}
		try{
			Fs.unlinkSync( filepath );
		}catch( error ){
			Log( 'error', `Cannot delete process information file [${filename}].`, error );
		}
	}

	killProcess( signal: string|number = 'SIGINT' ): boolean{
		if( !this.processInfo ){
			Log( 'error', `No PID available. Cannot kill the process.` );
			return false;
		}
		try{
			process.kill( this.processInfo.pid, signal );
			return true;
		}catch( error ){
			Log( 'error', `Cannot kill process.`, error );
			return false;
		}
	}

	static loadProcess( filename: string = 'process.yml' ): ProcessManager{
		let filepath: string = Path.join( getBuildDirectory(), 'resources', filename );
		try{
			let fileContent: string = Fs.readFileSync( filepath, 'utf8' );
			let processInfo: Process = Yaml.safeLoad( fileContent );
			return new ProcessManager( processInfo );
		}catch( error ){
			Log( 'error', `Cannot load process from file [${filename}].`, error );
			return;
		}
	}

}