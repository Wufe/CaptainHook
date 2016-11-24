/// <reference path="../../../typings/index.d.ts" />

import {randomBytes} from 'crypto';
import {fake} from 'faker';

import {EntryRepository} from '.';

export type IEntry = {
	id?: number,
	name?: string;
	description?: string;
	uri: string;
	tasks?: string[];
};

const defaultData: IEntry = {
	id: null,
	name: null,
	description: null,
	uri: null,
	tasks: []
};

export default class Entry{

	entryRepository: EntryRepository;
	data: IEntry;

	constructor( entryRepository: EntryRepository, data?: IEntry ){
		this.entryRepository = entryRepository;
		if( !data )
			data = defaultData;
		this.data = data;
		this.create();
	}

	create(): void{
		if( !this.data.uri )
			this.data.uri = this.createUri();
		if( !this.data.name )
			this.data.name = this.createName();
	}

	createUri(): string{
		let uri: string = null;
		while( !uri ){
			let id: string = randomBytes( 32 ).toString( 'hex' );
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

	getUri(): string{
		return this.data.uri;
	}

	getName(): string{
		return this.data.name;
	}

}