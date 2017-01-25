const externals = require( 'webpack-node-externals' );
var webpack = require( 'webpack' );

const env = process.env;
env[ 'NODE_ENV' ] = "production";
for( let k in env ){
    env[k] = JSON.stringify( env[k] );
}


module.exports = {
    context: __dirname,
    devtool: "null",
    resolve: {
        extensions: [ "", ".webpack.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        chook: "./index.ts",
        "../../migrations/models": [ "./data/models/index.ts" ]
    },
    output: {
        path: 'dist/lib',
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader!ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            debug: false,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            },
            mangle: false
        }),
        new webpack.DefinePlugin({
            'process.env': env
        })
    ],
    externals: [ externals() ],
    node:{
        __filename: true,
        __dirname: true
    }
};