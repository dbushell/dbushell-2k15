import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';

export default {
  name: 'dbushell',
  input: 'src/containers/index.jsx',
  strict: true,
  output: {
    file: 'dbushell.github.io/assets/js/app.js',
    format: 'iife'
  },
  plugins: [
    json(),
    nodeResolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.json']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel({
      include: ['./src/**', './node_modules/preact/**'],
      babelrc: false,
      presets: ['es2015-rollup', 'react'],
      plugins: [
        'transform-object-rest-spread',
        'transform-async-to-generator',
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              react: 'preact',
              'react-dom': 'preact'
            }
          }
        ]
      ]
    }),
    replace({
      'React.createElement': 'React.h'
    })
  ]
};
