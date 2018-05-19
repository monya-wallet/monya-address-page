const webpack = require("webpack")
const Uglify = require("uglifyjs-webpack-plugin");

module.exports = {
  context: __dirname ,
  entry: "./main.js",
  output: {
    path:__dirname,
    filename:"./dist/dist.js",
  },
  node: {
    fs: 'empty',net:"empty","tls":"empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
        },{
        test: /\.scss$/,
        use:[{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS
          options:{
            minimize:true
          }
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },{
        test: /\.css$/, use:[{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },{
        test: /\.html$/,
        use: 'vue-template-loader'
      },{
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|m4a)$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              outputPath:"dist/assets/"
            }
          }
        ]
      }
    ]
  },
  /*plugins: [
    new Uglify({
      uglifyOptions:{
        mangle:{
          safari10: true,
          reserved:[
            
          ]
        }
      }
    })
    ]*/
};
