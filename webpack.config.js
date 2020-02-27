const path = require('path');

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src/containers/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dbushell.github.io/assets/js/'),
    filename: argv.mode === 'development' ? 'app.js' : 'app.min.js'
  },
  externals:
    argv.mode !== 'development'
      ? {}
      : {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  debug: argv.mode === 'development',
                  targets: '> 1%, not dead, not ie 11',
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              ['@babel/preset-react']
            ],
            plugins: []
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias:
      argv.mode === 'development'
        ? {}
        : {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat'
          }
  }
});
