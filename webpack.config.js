
const path = require('path');
const webpack= require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({path: '.env.test'});
}else if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({path: '.env.development'});
}

//env is passed as an argument in the scripts commands in package.json
module.exports = (env) => {
    console.log('env' + env);
    const isProduction = env === 'production' ? true : false;
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' }); 

    return {
        entry: ['babel-polyfill','./src/app'], //application start point
        output: {
            path: path.join(__dirname,'public', 'dist'),
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
            CSSExtract,
            new webpack.DefinePlugin({
                //find in the code the keys 
                //wherever the key is used, it will have the value given here see fireabse.js
                //key : value
                'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_DATABASE_URL':JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
            })
        ],
        devtool: isProduction ?'source-map': 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}
