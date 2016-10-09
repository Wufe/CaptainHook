module.exports = {
    context: __dirname,
    devtool: "eval",
    resolve: {
        extensions: [ "", ".webpack.js", ".ts", ".tsx", ".js" ]
    },
    entry: {
        index: "./index.tsx"
    },
    output: {
        path: 'src/server/build',
        filename: "[name].js",
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
    }
};