/// <reference path="../../../typings/index.d.ts" />

import {randomBytes} from 'crypto';
import {fake} from 'faker';

import {EntryRepository} from '.';
import {Entry} from '../actors';

export type IEntry = {
	id?: number,
	name?: string;
	description?: string;
	uri: string;
	created_at?: Date;
	updated_at?: Date;
	tasks?: string[];
	[key:string]: any;
};

const defaultData: IEntry = {
	id: null,
	name: null,
	description: null,
	uri: null,
	tasks: []
};

export default class EntryModel{

	entryRepository: EntryRepository;
	data: IEntry;
	actor: Entry;

	constructor( entryRepository: EntryRepository, data?: IEntry, actor?: Entry ){
		this.entryRepository = entryRepository;
		this.data = Object.assign( {}, defaultData, data );
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

	save(): Promise<Entry>{
		return new Promise<Entry>( ( resolve, reject ) => {
			if( !this.actor ){
				let {name, description, uri} = this.data;
				this.actor = new Entry( name, description, uri );
			}

			this.actor
				.save()
				.then( ( entry: Entry ) => {
					let {created_at, description, id, name, updated_at, uri} = entry.get();
					this.set( 'id', id );
					this.set( 'name', name );
					this.set( 'description', description );
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