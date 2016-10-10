var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    context: __dirname,
    devtool: "source-map-loader",
    resolve: {
        extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        main: "./index.tsx",
        vendor: [ "react", "react-dom" ]
    },
    output: {
        publicPath: "/",
        path: path.join( 'build', 'resources', 'assets' ),
        filename: "javascript/[name].bundle.js",
        chunkFilename: 'javascript/[name].chunk.js'
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css!'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass!'
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader?mimetype=image/jpeg&limit=100000&name=images/img-[name].[ext]'
            }
        ]
    },
    plugins: []
};