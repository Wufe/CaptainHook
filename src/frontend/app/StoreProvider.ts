/// <reference path="../../../typings/index.d.ts" />

declare let window: any;

import * as ImmutableState from 'redux-immutable-state-invariant';
import * as Logger from 'redux-logger';
import * as Redux from 'redux';
import Thunk from 'redux-thunk';
import {App} from './states';
import {applyMiddleware, compose} from 'redux';
import {browserHistory} from 'react-router';
import {default as Saga} from 'redux-saga';
import {syncHistoryWithStore} from 'react-router-redux';
import {root as rootReducer} from './reducers';
import {root as rootSaga} from './sagas';

type State = App;

class StoreProvider{

	store: Redux.Store<State>;

	constructor( initialState?: State ){

		const saga = Saga();

		this.store = Redux.createStore(
			rootReducer,
			initialState,
			compose(
				applyMiddleware( saga, Thunk, ImmutableState(), Logger({ collapsed: true }) ),
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);
		saga.run( rootSaga );
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