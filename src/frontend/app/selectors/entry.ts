/// <reference path="../../../../typings/index.d.ts" />

import {Entries, Entry, State} from '../states';
import {createSelector} from 'reselect';

export type EntryItem = Entry & {
	id: number;
};

const getEntriesState = ( state: State ) => state.entries;

export const getEntriesArrayFromObject = createSelector<State, EntryItem[], Entries>(
	getEntriesState,
	( entriesState: Entries ) => {
		let entryItems: EntryItem[] = [];
		for( let key in entriesState ){
			let id = parseInt(key);
			entryItems.push(Object.assign({}, {
				id
			}, entriesState[ id ] ) );
		}
		return entryItems;
	}
);