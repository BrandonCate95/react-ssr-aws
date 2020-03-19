const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
    })
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
    mode: dev ? "development" : "production",
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./client.js",
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  loader: [
                    {
                      loader: 'css-loader',
                      query: {
                        localIdentName: '[hash:8]',
                        modules: true
                      }
                    }
                  ]
                })
            }
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },
    plugins,
};
