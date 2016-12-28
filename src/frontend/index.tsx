/// <reference path="../../typings/index.d.ts" />
/// <reference path="../typings/react-hot-loader/index.d.ts" />

import 'react-hot-loader/patch';
import 'babel-polyfill';
import {AppContainer} from 'react-hot-loader';
import * as React from 'react';
import {Component} from 'react';
import {render as DOMRender, unmountComponentAtNode} from 'react-dom';
import Root from './app/Root';

import {browserHistory} from 'react-router';

const appRoot = document.getElementById( 'app' );

export interface HotNodeModule extends NodeModule {
	hot: { accept: Function };
}

const renderApp = ( App: any ) => {
	DOMRender(
		<AppContainer>
			<App />
		</AppContainer>,
		appRoot
	);
};

renderApp( Root );

declare let module: HotNodeModule;
if( module.hot ){
	module.hot.accept( './app/Root', () => {
		const NextApp = require( './app/Root' ).default;
		unmountComponentAtNode( appRoot );
		renderApp( NextApp );
	})
}