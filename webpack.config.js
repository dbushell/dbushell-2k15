const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/containers/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dbushell.github.io/assets/js/'),
    filename: 'app.min.js'
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
                  debug: true,
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 1 versions']
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
    extensions: ['.js', '.jsx']
  }
};
