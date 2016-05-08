'use strict';

import webpack from 'webpack';

// loaders to use for different file type
var loaders = [
  {
    // tell webpack to use babel for all *.js and *.jsx files
    // babel will compile files according to babel settings
    // in package.json (especially "presets" array)
    test: /\.(js|jsx)$/,
    loader: 'babel'
  }
]

// don't bundle these libraries
var externals =  {
  // use React and ReactDOM from external source (do not bundle)
  'react': 'React',
  'react-dom': 'ReactDOM',

  // use jquery from external source (do not bundle)
  'jquery': 'jQuery'
}

var plugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true})
];

module.exports = [
  {
    name: "browser",
    context: __dirname + "/../src/scripts",
    entry: "./main.js",
    module: {
      loaders: loaders
    },
    externals: externals,
    plugins: plugins,
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
          "request": "browser-request"
      }
    },
    output: {
      path: __dirname + "/../public/scripts",
      filename: "bundle.js"
    }
  }
]
