const externals = require( 'webpack-node-externals' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

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
                exclude: /node_modules/,
                loader: 'babel-loader!ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.yml$/,
                loader: 'json-loader!yaml-loader'
            }
        ]
    },
    externals: [ externals() ],
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: '../../analysis/report.html',
            openAnalyzer: false
        })
    ],
    node:{
        __filename: true,
        __dirname: true
    }
};