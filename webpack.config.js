
const path = require('path');

module.exports = (env) => {
    console.log('env' + env);
    const isProduction = env === 'production' ? true : false;
    return {
        entry: './src/app', //application start point
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: { //loader
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,/**run babel only for files that end in js*/
                exclude: /node_modules/ /** exclude node modules folder  */
            },
            {
                test: /\.s?css$/,
                use: [ //allows to have an array of loaders
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
            ]

        },
        devtool: isProduction ?'source-map': 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
}
