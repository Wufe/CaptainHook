/// <reference path="../../../typings/index.d.ts" />

import {randomBytes} from 'crypto';
import {fake} from 'faker';

import {EntryManager} from '.';
import {Entry, Task} from '../actors';

const uuid = require( 'uuid/v4' );

export type METHOD_GET = 'get';
export type METHOD_POST = 'post';
export type METHOD_PUT = 'put';
export type METHOD_PATCH = 'patch';
export type METHOD_DELETE = 'delete';

export type RequestMethod = METHOD_GET | METHOD_POST | METHOD_PUT | METHOD_PATCH | METHOD_DELETE;

export type Schema = {
	[id: number]: number;
}

export type IEntry = {
	id?: number,
	name?: string;
	description?: string;
	uri: string;
	method?: string;
	options?: any;
	created_at?: Date;
	updated_at?: Date;
	tasks?: Task[];
	schema?: Schema;
	[key:string]: any;
};

const defaultData: IEntry = {
	id: null,
	name: null,
	description: null,
	uri: null,
	method: 'post',
	options: {
		pipe: false,
		content_type: "text/plain",
		x_hub_signature: false,
		secret: null
	},
	schema: {},
	tasks: []
};

export default class EntryModel{

	data: IEntry;
	actor: Entry;

	constructor( data?: IEntry, actor?: Entry ){
		this.data = Object.assign( {}, defaultData );
		for( let key in data ){
			if( data[ key ] )
				this.set( key, data[ key ] );
		}
		if( data.options ){
			let options = Object.assign( {}, defaultData.options, data.options );
			this.set( 'options', options );
		}
		this.actor = actor;
		this.create();
	}

	get( key?: string ): any{
		if( !key && this.actor ){
			return this.actor.get();
		}else if( !key ){
			return this.data;
		}
		return this.data[key];
	}

	set( key: string, value: any ): void{
		if( key == 'uri' )
			value = this.filterUri( value );
		this.data[key] = value;
		if( this.actor )
			this.actor.set( key, value );
	}

	getTasks(): Task[]{
		return this.data.tasks;
	}

	loadTasks(): Promise<EntryModel>{
		return new Promise( ( resolve, reject ) => {
			if( !this.data.id ){
				reject( new Error( `No entry model id specified.` ) );
			}
			Task.find.all({
				where: {
					entry_id: this.data.id
				}
			})
			.then( ( tasks: Task[] ) => {

				tasks = this.sortTasks( tasks );
				this.data.tasks = tasks;
				resolve( this );
			})
			.catch( ( error: any ) => {
				reject( error );
			})
		});
	}

	updateSchema( task: Task, after: number ): Promise<void>{
		return new Promise<void>( ( resolve, reject ) => {
			let schema: Schema = this.get( 'schema' );
			let assignedPos: number = null;
			if( ( after === null || after === undefined ) || schema[ after ] === undefined ){
				let highestPosition = this.getHighestPos( schema );
				assignedPos = highestPosition +1;
			}else{
				let referencedPos: number = schema[ after ];
				for( let id in schema ){
					if( schema[ id ] > referencedPos )
						schema[ id ]++;
				}
				assignedPos = referencedPos +1;
			}
			schema[ task.get( 'id' ) ] = assignedPos;
			this.set( 'schema', schema );
			this.save()
				.then( () => {
					resolve();
				})
				.catch( ( error: any ) => {
					reject( error );
				})
		})
	}

	getHighestPos( schema: Schema ): number{
		let highestPos = -1;
		for( let id in schema ){
			if( schema[ id ] > highestPos )
				highestPos = schema[ id ];
		}
		return highestPos;
	}

	sortTasks( tasks: Task[] ): Task[]{
		let schema: Schema = Object.assign({}, this.get( 'schema' ));
		let taskList: Task[] = [];
		while( Object.keys( schema ).length > 0 ){
			let lowestPos: number = Infinity;
			let lowestPosTaskID: number = -1;
			for( let id in schema ){
				if( schema[ id ] < lowestPos ){
					lowestPos = schema[ id ];
					lowestPosTaskID = parseInt(id);
				}
			}
			delete schema[ lowestPosTaskID ];
			let lowestPosTaskIndex = this.findTaskById( lowestPosTaskID, tasks );
			let lowestPosTask = lowestPosTaskIndex > -1 ? tasks[ lowestPosTaskIndex ] : null;
			if( lowestPosTask ){
				taskList.push( lowestPosTask );
			}
		}
		return taskList;
	}

	findTaskById( id: number, tasks: Task[] ): number{
		return tasks.findIndex( ( task: Task ) => {
			return id == task.get( 'id' );
		});
	}

	filterUri( uri: string ): string{
		if( !( uri.match( /^\/webhook\//i ) ) )
			uri = `/webhook/${uri}`;
		return uri;
	}

	create(): void{
		if( !this.data.uri )
			this.set( 'uri', this.createUri() );
		if( !this.data.name )
			this.set( 'name', this.createName() );
	}

	delete(): Promise<any>{
		return new Promise<any>( ( resolve, reject ) => {
			if( !this.actor )
				reject( `No actor specified.` );
			this.actor.delete()
				.then( () => {
					resolve();
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}

	save(): Promise<Entry>{
		return new Promise<Entry>( ( resolve, reject ) => {
			if( !this.actor ){
				let {name, description, method, uri, options, schema} = this.data;
				this.actor = new Entry({ name, description, method, uri, options, schema});
			}
			this.actor
				.save()
				.then( ( entry: Entry ) => {
					let {description, id, name, method, uri, options, schema, created_at, updated_at} = entry.getAll();
					this.set( 'id', id );
					this.set( 'name', name );
					this.set( 'description', description );
					this.set( 'method', method );
					this.set( 'uri', uri );
					this.set( 'options', options );
					this.set( 'schema', schema );
					this.set( 'created_at', created_at );
					this.set( 'updated_at', updated_at );
					this.actor = entry;
					resolve( entry );
				}).catch( ( error: any ) => {
					reject( error );
				});
			
		});
		
	}

	createUri(): string{
		let id = uuid();
		let uri = `/webhook/${id}`;
		return uri;
	}

	createName(): string{
		let name = fake( "{{hacker.ingverb}} {{name.lastName}}" ).toLowerCase().replace( /\W+/g, '_' );
		return name;
	}

	getId(): number{
		return this.data.id;
	}

	getUri(): string{
		return this.data.uri;
	}

	getName(): string{
		return this.data.name;
	}

	print(){
		let result: any = this.get();
		let options: any = Object.assign({}, this.get( 'options' ) );
		delete options[ 'secret' ];
		result.options = options;
		let tasks = this.getTasks();
		if( tasks.length > 0 ){
			result.tasks = tasks.map( ( task ) => {
				return task.get();
			});
		}
		return result;
	}

}