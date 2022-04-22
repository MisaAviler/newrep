const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const envOptions = {
    'useBuiltIns': false,
    'targets': {
        'browsers': [
            'android >= 5',
            'ios >= 10',
            '> 5%',
        ],
    },
};

module.exports = env => {
    return {
        entry: [
            './index.js'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            library: 'sage',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: { presets: [
                            ['@babel/preset-env', envOptions],
                        ]},
                    },
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader',
                            options: { minimize: true },
                        }],
                        fallback: 'style-loader',
                    }),
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inlineSource: '.(js|css)$',
                template: `./index.html`,
            }),
            new ExtractTextPlugin('styles.css'),
            new HtmlWebpackInlineSourcePlugin(),
        ]
    }
};
