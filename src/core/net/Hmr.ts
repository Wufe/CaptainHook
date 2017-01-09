/// <reference path="../../../typings/index.d.ts" />

import * as Path from 'path';
import {Environment, getProjectRoot, getBuildDirectory, getEnvironment, Log} from '../chook';

const webpack = require( "webpack" );
const webpackDevMiddleware = require( "webpack-dev-middleware" );
const webpackHotMiddleware = require( "webpack-hot-middleware" );
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000&reload=true';

let webpackConfiguration: any = require( "../../frontend/dev.webpack.js" );
webpackConfiguration = Object.assign( {}, webpackConfiguration, {
	context: getProjectRoot(),
	entry: {
        main: [ Path.join( getProjectRoot(), "src", "frontend", "index.tsx" ), hotMiddlewareScript ],
        vendor: [ "react", "react-dom", hotMiddlewareScript ]
    },
    plugins: [ ...webpackConfiguration.plugins, new webpack.HotModuleReplacementPlugin() ]
});

import * as Webpack from 'webpack';

import Server from './Server';

export default class Hmr{

	server: Server;
	environment: Environment;

	constructor( server: Server ){
		this.server = server;
		this.environment = getEnvironment();
	}

	isDebugEnvironment(): boolean{
		return this.environment.get( 'args', 'debug' ) ? true : false;
	}

	isDevelopmentEnvironment(): boolean{
		return this.environment.get( 'args', 'development' ) ? true : false;
	}

	setup(): void{
		if( !this.isDevelopmentEnvironment() )
			return;
		Log( 'debug', 'Starting hmr..' );
		let compiler: any = Webpack( webpackConfiguration );
		this.server.express.use( webpackDevMiddleware( compiler, {
			quiet: false,
			noInfo: true,
			hot: true,
			filename: 'javascript/main.bundle.js',
			publicPath: webpackConfiguration.output.publicPath,
			stats: {
				colors: true
			},
			historyApiFallback: true
		}));
		this.server.express.use( webpackHotMiddleware( compiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 3 * 1000
		}));
		this.server.express.get( '/*hot-update.json', ( req, res ) => {
			res.status( 200 ).send( '' );
		})
	}
}