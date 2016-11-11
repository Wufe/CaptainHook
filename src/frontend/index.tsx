/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {routes, store} from './app';

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.getElementById( 'app' )
);