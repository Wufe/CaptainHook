var webpack = require( 'webpack' );

module.exports = {
    context: __dirname,
    devtool: "null",
    resolve: {
        extensions: [ "", ".webpack.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        chook: "./index.ts"
    },
    output: {
        path: 'dist/lib',
        filename: "chook.js",
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
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
            'process.env': {
                'NODE_ENV': JSON.stringify( 'production' )
            }
        })
    ]
};