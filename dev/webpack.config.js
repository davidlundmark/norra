var debug = true; //process.env.NODE_ENV !== 'production';

var webpack = require('webpack');
var extracttextplugin = require('extract-text-webpack-plugin');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

//var livereloadplugin = require('webpack-livereload-plugin');

var jsFile = '../scripts.min.js';
var cssFile = '../styles.min.css';

module.exports = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: [
        './app.js'
        /*,
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',*/
    ],
    output: {
        path: __dirname,
        filename: jsFile,
        publicPath: './assets/'
    },
    //watch: true,
    plugins: debug ? [
        new extracttextplugin(cssFile),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        //new webpack.HotModuleReplacementPlugin()
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new extracttextplugin(cssFile),
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })
    ],
    module: {
        loaders: debug ? [{
                test: /\.scss$/,
                loader: extracttextplugin.extract(
                    'style-loader', // The backup style loader
                    ['css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
                )
            },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader?name=../assets/fonts/[name]/[name].[ext]" },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=../assets/images/[name].[ext]' }
        ] : [{
                test: /\.scss$/,
                loader: extracttextplugin.extract(
                    'style-loader', // The backup style loader
                    ['css-loader', 'postcss-loader', 'sass-loader']
                )
            },
            { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader?name=../assets/fonts/[name]/[name].[ext]" },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=../assets/images/[name].[ext]' }
        ]
    },
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    'Android >= 2.3',
                    'BlackBerry >= 7',
                    'Chrome >= 9',
                    'Firefox >= 4',
                    'Explorer >= 9',
                    'iOS >= 5',
                    'Opera >= 11',
                    'Safari >= 5',
                    'OperaMobile >= 11',
                    'OperaMini >= 6',
                    'ChromeAndroid >= 9',
                    'FirefoxAndroid >= 4',
                    'ExplorerMobile >= 9'
                ]
            }),
            precss
        ];
    },
    sassLoader: {
        includePaths: [].concat('client/style' )
    }/*,
    devServer: {
        inline: true
    }*/
};
