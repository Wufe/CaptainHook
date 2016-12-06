/// <reference path="../../../typings/index.d.ts" />

import {randomBytes} from 'crypto';
import {fake} from 'faker';

import {EntryRepository} from '.';
import {Entry, Task} from '../actors';

export type METHOD_GET = 'get';
export type METHOD_POST = 'post';
export type METHOD_PUT = 'put';
export type METHOD_PATCH = 'patch';
export type METHOD_DELETE = 'delete';

export type RequestMethod = METHOD_GET | METHOD_POST | METHOD_PUT | METHOD_PATCH | METHOD_DELETE;

export type IEntry = {
	id?: number,
	name?: string;
	description?: string;
	uri: string;
	method?: string;
	created_at?: Date;
	updated_at?: Date;
	tasks?: Task[];
	[key:string]: any;
};

const defaultData: IEntry = {
	id: null,
	name: null,
	description: null,
	uri: null,
	method: 'post',
	tasks: []
};

export default class EntryModel{

	entryRepository: EntryRepository;
	data: IEntry;
	actor: Entry;

	constructor( entryRepository: EntryRepository, data?: IEntry, actor?: Entry ){
		this.entryRepository = entryRepository;
		this.data = Object.assign( {}, defaultData );
		for( let key in data ){
			if( data[ key ] )
				this.set( key, data[ key ] );
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
				this.data.tasks = tasks;
				resolve( this );
			})
			.catch( ( error: any ) => {
				reject( error );
			})
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
				.then( ( rows: number ) => {
					return this.entryRepository.loadEntries();
				})
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
				let {name, description, method, uri} = this.data;
				this.actor = new Entry({ name, description, method, uri });
			}

			this.actor
				.save()
				.then( ( entry: Entry ) => {
					let {created_at, description, id, name, method, updated_at, uri} = entry.get();
					this.set( 'id', id );
					this.set( 'name', name );
					this.set( 'description', description );
					this.set( 'method', method );
					this.set( 'uri', uri );
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
		let uri: string = null;
		while( !uri ){
			let id: string = randomBytes( 16 ).toString( 'hex' );
			uri = `/webhook/${id}`;
			if( this.entryRepository.findByUri( uri ) )
				uri = null;
		}
		return uri;
	}

	createName(): string{
		let name: string = null;
		while( !name ){
			name = fake( "{{hacker.ingverb}} {{name.lastName}}" ).toLowerCase().replace( /\W+/g, '_' );
			if( this.entryRepository.findByName( name ) )
				name = null;
		}
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

}