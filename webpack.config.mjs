import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/scripts/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve('.', 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join('.', 'dist'),
    },
    open: true,
  },

  mode: 'development',
};
