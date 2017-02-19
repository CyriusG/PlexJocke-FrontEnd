var debug = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');

console.log(path.join(__dirname, 'src/' , 'index.html'));

module.exports = {
    context: __dirname + "/src",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/client.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'client.min.js',
        publicPath: '/'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: true, sourcemap: true }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify("https://api.nit13.se"),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        root: [path.resolve('./src'), path.resolve('./src')],
        extensions: ['', '.js', '.css']
    },
};