import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
// import uglify from 'rollup-plugin-uglify';
// import inject from 'rollup-plugin-inject';

export default {
  moduleName: 'dbushell',
  entry: 'src/containers/root.jsx',
  dest: 'dbushell.github.io/assets/js/app.js',
  format: 'iife',
  external: ['moment'],
  // external: ['moment', 'React', 'ReactDOM'],
  plugins: [
    json(),
    babel({
      exclude: ['node_modules/**'],
      "babelrc": false,
      "presets": [
        "es2015-rollup",
        "react"
      ],
      "plugins": [
        // "add-module-exports",
        // "external-helpers",
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
            "root": [
              "."
            ],
            "alias": {
              "react": "preact-compat",
              "react-dom": "preact-compat"
            }
          }
        ]
      ]
    }),
    // inject({
    //   exclude: ['node_modules/**'],
    //   modules: {
    //     React: 'preact-compat',
    //     ReactDOM: 'preact-compat'
    //   }
    // }),
    resolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.json']
    }),
    commonjs({
      // include: 'node_modules/**',
      namedExports: {
        './node_modules/proptypes/index.js':
        ['PropTypes'],
        './node_modules/preact/dist/preact.js':
        ['Component', 'cloneElement', 'h', 'options', 'render']
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })//,
    // uglify({
    //   compress: {
    //     screw_ie8: true,
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourceMap: false
    // })
  ]
};
