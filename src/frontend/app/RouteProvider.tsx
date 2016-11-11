/// <reference path="../../../typings/index.d.ts" />

import App from './App';
import {loader} from './lib';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import {browserHistory, IndexRoute, Route} from 'react-router';

class RouteProvider{

	get(){
		return (
			<Route path="/" component={App}>
				<IndexRoute getComponent={loader( "index" )} />
			</Route>
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