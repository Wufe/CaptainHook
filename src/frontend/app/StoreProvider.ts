/// <reference path="../../../typings/index.d.ts" />

declare let window: any;

import * as ImmutableState from 'redux-immutable-state-invariant';
import * as Logger from 'redux-logger';
import {App, Entries, State} from './states';
import {applyMiddleware, createStore, compose, Store} from 'redux';
import {browserHistory} from 'react-router';
import {default as Saga} from 'redux-saga';
import {syncHistoryWithStore} from 'react-router-redux';
import {root as rootReducer} from './reducers';
import {root as rootSaga} from './sagas';

const saga = Saga();

class StoreProvider{

	store: Store<State>;

	constructor( initialState?: State ){

		this.store = createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware( saga, ...( this.getMiddlewares() ) ),
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);
		saga.run( rootSaga );
	}

	private getMiddlewares(): any[]{
		let middlewares: any[] = [ saga ];
		if( !( process.env.NODE_ENV == "production" ) ){
			return [ ...middlewares, Logger({ collapsed: true }), ImmutableState() ];
		}
		return middlewares;
	}

	get(): Store<State>{
		return this.store;
	}
}

const storeProviderInstance: StoreProvider = new StoreProvider({
	app: {
		loading: false,
		notifications: [
			{
				id: 1,
				text: "Test notification #1"
			}
		],
		auth: {
			logging: false,
			logged: false
		}
	},
	entries: {}
});
const store = storeProviderInstance.get();
const history = syncHistoryWithStore( browserHistory, store );

export {
	history,
	StoreProvider,
	storeProviderInstance,
	store
};