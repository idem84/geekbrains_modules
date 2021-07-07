const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "whatwg-fetch", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist/public/'),
        publicPath: "",
        filename: "js/[name].js"
    },
    target: "web",
    module: {
        rules: [
            {
                // js - компиляция es6+ в es5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
					loader: 'babel-loader',
					options: {
					  presets: ['@babel/preset-env'],
					  plugins: ['@babel/plugin-proposal-class-properties']
					}
				  }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/public/index.html",
            filename: "index.html",
            excludeChunks: ['server']
        }),
		new CopyPlugin([
            {
                from: 'src/public/sounds',
                to: 'sounds/[name].[ext]',
                toType: 'template'
            }
        ])
    ]
};