/// <reference path="../../../typings/index.d.ts" />

declare let window: any;

import * as ImmutableState from 'redux-immutable-state-invariant';
import * as Logger from 'redux-logger';
import {App} from './states';
import {applyMiddleware, createStore, compose, Store} from 'redux';
import {browserHistory} from 'react-router';
import {default as Saga} from 'redux-saga';
import {syncHistoryWithStore} from 'react-router-redux';
import {root as rootReducer} from './reducers';
import {root as rootSaga} from './sagas';

type State = {
	app: App
};

class StoreProvider{

	store: Store<State>;

	constructor( initialState?: State ){

		const saga = Saga();

		this.store = createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware( saga, ImmutableState(), Logger({ collapsed: true }) ),
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);
		saga.run( rootSaga );
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
		]
	}
});
const store = storeProviderInstance.get();
const history = syncHistoryWithStore( browserHistory, store );

export {
	history,
	StoreProvider,
	storeProviderInstance,
	store
};