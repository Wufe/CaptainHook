/// <reference path="../../../typings/index.d.ts" />

import {Structure} from './components';
import {loader} from './lib';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {dispatch, history} from './StoreProvider';
import Home from './routes/home';

export const PATH_INDEX = '/';
export const PATH_HOME  = 'home';
export const PATH_LOGIN = 'login';
export const PATH_ENTRY_CREATE = 'entry/create';
export const PATH_ENTRY_SHOW = 'entry/:id';
export const PATH_TASK_SHOW = 'task/:id';

export type Routing = {
	pathname?: string;
	search?: string;
	query?: { [key: string]: any; };
	state?: Object;
	action?: string;
	key?: string;
	hash?: string;
	basename?: string;
};

class RouteProvider{

	get(){
		return (
			<Router history={history}>
				<Route path={PATH_INDEX} component={Structure}>
					<IndexRoute getComponent={loader( "index" )} />
					<Route path={PATH_HOME} component={Home}></Route>
					<Route path={PATH_LOGIN} getComponent={loader( "login" )}></Route>
					<Route path={PATH_ENTRY_CREATE} getComponent={loader( "index" )}/>
					<Route path={PATH_ENTRY_SHOW} getComponent={loader( "index" )} />
					<Route path={PATH_TASK_SHOW} getComponent={loader( "index" )} />
				</Route>
			</Router>
		);
	}

	goto( route: string ){
		browserHistory.push( route );
	}

}

const routeProviderInstance: RouteProvider = new RouteProvider();
const routes: any = routeProviderInstance.get();
const goto: ( route: string ) => void = routeProviderInstance.goto;

export{
	goto,
	RouteProvider,
	routeProviderInstance,
	routes
}