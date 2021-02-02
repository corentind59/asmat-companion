'use strict';

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs-module',
    path: path.resolve(__dirname, 'build'),
  }
};
