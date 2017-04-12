import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
// import commonjs from 'rollup-plugin-commonjs';

export default {
  moduleName: 'dbushell',
  entry: 'src/containers/root.jsx',
  dest: 'dbushell.github.io/assets/js/app.js',
  format: 'iife',
  // globals: {
  //   'preact': 'preact'
  // },
  plugins: [
    json(),
    nodeResolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.json']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // commonjs({
    //   namedExports:
    //   {
    //     // './node_modules/proptypes/index.js':
    //     // ['PropTypes'],
    //     './node_modules/preact/dist/preact.js':
    //     ['Component', 'cloneElement', 'h', 'options', 'render']
    //   },
    // }),
    babel({
      "include": ['./src/**', './node_modules/preact/**'],
      "babelrc": false,
      "presets": [
        "es2015-rollup",
        "react"
      ],
      "plugins": [
        "transform-object-rest-spread",
        "transform-async-to-generator",
        // [
        //   "transform-react-jsx",
        //   {
        //     "pragma": "h"
        //   }
        // ],
        [
          "module-resolver",
          {
            "root": ["."],
            "alias": {
              "react": "preact", // preact-compat
              "react-dom": "preact" // preact-compat
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
