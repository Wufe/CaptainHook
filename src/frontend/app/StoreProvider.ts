/// <reference path="../../../typings/index.d.ts" />

declare let window: any;

import * as ImmutableState from 'redux-immutable-state-invariant';
import * as Logger from 'redux-logger';
import * as Redux from 'redux';
import Thunk from 'redux-thunk';
import {App} from './states';
import {applyMiddleware, compose} from 'redux';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {root as rootReducer} from './reducers';

type State = App;

class StoreProvider{

	store: Redux.Store<State>;

	constructor( initialState?: State ){
		this.store = Redux.createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware( Thunk, ImmutableState(), Logger() ),
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);
	}

	get(): Redux.Store<State>{
		return this.store;
	}
}

const storeProviderInstance: StoreProvider = new StoreProvider();
const store = storeProviderInstance.get();
const history = syncHistoryWithStore( browserHistory, store );

export {
	history,
	StoreProvider,
	storeProviderInstance,
	store
};