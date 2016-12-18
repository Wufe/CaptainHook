/// <reference path="../../../typings/index.d.ts" />

import {Structure} from './components';
import {loader} from './lib';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {history} from './StoreProvider';
import Home from './routes/Home';

class RouteProvider{

	get(){
		return (
			<Router history={history}>
				<Route path="/" component={Structure}>
					<IndexRoute getComponent={loader( "index" )} />
					<Route path="home" component={Home}></Route>
					<Route path="login" getComponent={loader( "login" )}></Route>
					<Route path="entry/:id" getComponent={loader( "index" )} />
					<Route path="task/:id" getComponent={loader( "index" )} />
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