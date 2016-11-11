/// <reference path="../../../typings/index.d.ts" />

declare let window: any;

import * as ImmutableState from 'redux-immutable-state-invariant';
import * as Logger from 'redux-logger';
import * as Redux from 'redux';
import Thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';
import {root as rootReducer} from './reducers';

class StoreProvider{

	store: Redux.Store<any>;

	constructor( initialState?: any ){
		this.store = Redux.createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware( Thunk, ImmutableState(), Logger() ),
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);
	}

	get(): Redux.Store<any>{
		return this.store;
	}
}

const storeProviderInstance: StoreProvider = new StoreProvider();
const store = storeProviderInstance.get();

export {
	StoreProvider,
	storeProviderInstance,
	store
};