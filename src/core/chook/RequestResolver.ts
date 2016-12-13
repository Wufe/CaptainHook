import {Task} from '../actors';
import {Log, EntryModel} from '.';

import {Request, Response, NextFunction} from 'express';
import * as Moment from 'moment';
import {ChildProcess, exec, spawn} from 'child_process'

import {red} from 'chalk';

const UUIDv1 = require( 'uuid/v1' );

type STATUS_RUNNING = 'running';
type STATUS_IDLE = 'idle';
type STATUS_DONE = 'done';

type Status = STATUS_IDLE | STATUS_DONE | STATUS_RUNNING;

export interface ExpressCall{
	request: Request;
	response: Response;
	next: NextFunction;
}

export default class RequestResolver{

	issued_at: string;
	uuid: string;
	status: Status;
	entry: EntryModel;
	expressCall: ExpressCall;

	logHandlers: ( ( message: string ) => void )[] = [];
	errorHandlers: ( ( message: string ) => void )[] = [];

	pipe: boolean;
	workingDirectory: string;

	constructor( entry: EntryModel, expressCall: ExpressCall ){
		this.entry = entry;
		this.pipe = entry.get( 'options' )[ 'pipe' ];
		this.expressCall = expressCall;
		this.issued_at = ( Moment() ).format();
		this.uuid = UUIDv1();
		this.status = 'idle';
		this.registerLogHandler( ( message: string ) => {
			Log( 'debug', "\n" + message );
		});
		this.registerErrorHandler( ( message: string ) => {
			Log( 'error', red( message ) );
		});
	}

	run(): Promise<any>{
		console.log( `Called ${this.entry.getUri()}` );
		if( !this.pipe )
			this.expressCall.response.sendStatus( 200 );
		return new Promise( ( resolve, reject ) => {
			let tasks = this.entry.getTasks();
			this.status = 'running';
			this.runTasks( tasks )
				.then( () => {
					this.status = 'done';
					if( this.pipe ){
						try{
							this.expressCall.response.end();
						}catch( e ){}
					}
				})
				.catch( ( error: any ) => {
					//
				})
		});
	}

	runTasks( tasks: Task[], resolve?: any ): Promise<any>{
		if( !resolve ){
			this.expressCall.response.status( 200 );
			return new Promise( ( resolve, reject ) => {
				this.runTasks( tasks, resolve );
			});
		}else{
			if( tasks.length == 0 ){
				resolve();
			}else{
				let task: Task = tasks[ 0 ];
				tasks = tasks.slice( 1 );
				this.runTask( task )
					.then( () => {
						this.runTasks( tasks, resolve );
					})
					.catch( () => {
						this.runTasks( tasks, resolve );
					});
			}
		}
	}

	runTask( task: Task ): Promise<any>{
		return new Promise( ( resolve, reject ) => {
			let env: any = this.getEnvironmentVariables( task );
			this.workingDirectory = task.get( 'working_dir' );
			let {workingDirectory: cwd} = this;
			let command = exec( task.get( 'command' ), {
				env,
				cwd
			});
			command.stdout.on( 'data', ( data: any ) => {
				this.log( data.toString() );
			})
			command.stderr.on( 'data', ( data: any ) => {
				this.error( data.toString() );
			});
			command.on( 'error', ( data: any ) => {
				this.error( data.toString() );
			});
			command.on( 'exit', ( code: number ) => {
				resolve();
			});
		});
	}

	getEnvironmentVariables( task: Task ){
		let body: any = this.expressCall.request.body;
		if( typeof body == 'object' )
			body = JSON.stringify( body );
		let options = this.entry.get( 'options' );
		let environment: {
			[key: string]: string | number;
		} = {
			CHOOK_ID: this.entry.getId(),
			CHOOK_NAME: this.entry.getName(),
			CHOOK_URI: this.entry.getUri(),
			CHOOK_DESCRIPTION: this.entry.get( 'description' ),
			CHOOK_METHOD: this.entry.get( 'method' ),
			CHOOK_BODY: body,
			CHOOK_OPTIONS_PIPE: options[ 'pipe' ],
			CHOOK_OPTIONS_CONTENT_TYPE: options[ 'content_type' ],
			CHOOK_OPTIONS_X_HUB_SIGNATURE: options[ 'x_hub_signature' ]
		};
		let taskEnvironment: {
			[key: string]: string;
		} = task.get( 'environment' );
		if( taskEnvironment ){
			for( let key in taskEnvironment ){
				environment[ key ] = taskEnvironment[ key ];
			}
		}
		return environment;
	}

	registerLogHandler( handler: ( message: string ) => void ): void{
		this.logHandlers.push( handler );
	}

	registerErrorHandler( handler: ( message: string ) => void ): void{
		this.errorHandlers.push( handler );
	}

	log( message: string ): void{
		if( this.pipe )
			this.expressCall.response.write( message );
		this.logHandlers.forEach( ( handler: ( message: string ) => void ) => {
			handler.call( this, message );
		});
	}

	error( message: string ): void{
		this.errorHandlers.forEach( ( handler: ( message: string ) => void ) => {
			handler.call( this, message );
		});
	}

}