module.exports = {
    context: __dirname,
    devtool: "eval",
    resolve: {
        extensions: [ "", ".webpack.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        chook: "./index.ts"
    },
    output: {
        path: 'build/lib',
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
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: [ 'express', 'js-yaml', 'handlebars' ],
    node:{
        __filename: true,
        __dirname: true
    }
};