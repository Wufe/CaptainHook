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

	constructor( entry: EntryModel, expressCall: ExpressCall ){
		this.entry = entry;
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
		return new Promise( ( resolve, reject ) => {
			let tasks = this.entry.getTasks();
			this.status = 'running';
			this.runTasks( tasks )
				.then( () => {
					this.status = 'done';
					this.expressCall.response.end();
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
			let command = exec( task.get( 'command' ) );
			command.stdout.on( 'data', ( data: any ) => {
				this.expressCall.response.write( data.toString() );
				this.log( data.toString() );
			})
			command.stderr.on( 'data', ( data: any ) => {
				this.error( data.toString() );
			});
			command.on( 'exit', ( code: number ) => {
				resolve();
			});
		});
	}

	registerLogHandler( handler: ( message: string ) => void ): void{
		this.logHandlers.push( handler );
	}

	registerErrorHandler( handler: ( message: string ) => void ): void{
		this.errorHandlers.push( handler );
	}

	log( message: string ): void{
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