const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/app/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  }
};
