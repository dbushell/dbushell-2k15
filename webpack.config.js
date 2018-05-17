const path = require('path');

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src/containers/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dbushell.github.io/assets/js/'),
    filename: argv.mode === 'development' ? 'app.js' : 'app.min.js'
  },
  externals: {
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
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 1 versions', 'not ie <= 11']
                  }
                }
              ],
              ['@babel/preset-react']
            ],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
});
