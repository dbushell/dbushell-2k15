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
              ['@babel/preset-react'],
              [
                '@babel/preset-env',
                {
                  debug: false,
                  bugfixes: true,
                  targets: {
                    esmodules: true
                  }
                }
              ]
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
