
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    console.log('env' + env);
    const isProduction = env === 'production' ? true : false;
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' }); 

    return {
        entry: './src/app', //application start point
        output: {
            path: path.join(__dirname,'public','dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        module: { //loader
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,/**run babel only for files that end in js*/
                exclude: /node_modules/ /** exclude node modules folder  */
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
            ]

        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ?'source-map': 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}
