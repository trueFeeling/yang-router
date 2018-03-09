const uglify = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
module.exports = {    
    entry: './examples/app.js',    
    output: {    
        path: __dirname,    
        filename: './examples/bundle.js',
        libraryTarget : 'umd' 
    },  
    module: {    
        loaders: [{    
            test: /\.js$/,    
            exclude: /node_modules/,    
            loader: 'babel-loader'    
        }]    
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': '"production"'
        })
    ] 
};

if (process.env.NODE_ENV === 'production') {
    module.exports = merge(module.exports, {
      output: {
        filename: './examples/bundle.min.js'
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {  
            warnings: false,  
            drop_debugger: true,  
            drop_console: true  
          },  
          sourceMap: true
        })
      ]
    })
  }
