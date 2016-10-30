const externals = require( 'webpack-node-externals' );

module.exports = {
    context: __dirname,
    devtool: "eval",
    resolve: {
        extensions: [ "", ".webpack.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        chook: "./index.ts",
        "../../migrations/models": [ "./data/models/index.ts" ]
    },
    output: {
        path: 'build/lib',
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: [ externals() ],
    node:{
        __filename: true,
        __dirname: true
    }
};