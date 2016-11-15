/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import {render as DOMRender, unmountComponentAtNode} from 'react-dom';
import App from './app/App';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import {history, routes, store} from './app';

const appRoot = document.getElementById( 'app' );

const renderApp = () => {
	DOMRender(
		<Provider store={store} children={routes} />,
		appRoot
	);
};

renderApp();