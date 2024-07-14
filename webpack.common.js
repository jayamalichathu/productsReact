const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,  // Adjust the file extension as necessary
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,  // Process SCSS files
                use: [
                    'style-loader',  // Injects styles into the DOM
                    'css-loader',    // Turns CSS into CommonJS modules
                    'sass-loader'    // Compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,  // Process CSS files
                use: [
                    'style-loader',  // Injects styles into the DOM
                    'css-loader'     // Turns CSS into CommonJS modules
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'  // Path to your HTML template
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};