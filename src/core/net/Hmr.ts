/// <reference path="../../../typings/index.d.ts" />

import * as Path from 'path';
import {Environment, Log} from '../chook';

const webpack = require( "webpack" );
const webpackDevMiddleware = require( "webpack-dev-middleware" );
const webpackHotMiddleware = require( "webpack-hot-middleware" );
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000&reload=true';

let webpackConfiguration: any = require( "../../frontend/dev.webpack.js" );
webpackConfiguration = Object.assign( {}, webpackConfiguration, {
	context: Environment.projectRoot,
	entry: {
        main: [ Path.join( Environment.projectRoot, "src", "frontend", "index.tsx" ), hotMiddlewareScript ],
        vendor: [ "react", "react-dom", hotMiddlewareScript ]
    },
    plugins: [ ...webpackConfiguration.plugins, new webpack.HotModuleReplacementPlugin() ]
});

import * as Webpack from 'webpack';

import Server from './Server';

export default class Hmr{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

	isDebugEnvironment(): boolean{
		return Environment.get( 'args', 'debug' ) ? true : false;
	}

	setup(): void{
		if( !this.isDebugEnvironment() )
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