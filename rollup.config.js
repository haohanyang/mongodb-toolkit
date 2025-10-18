const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');

/** @type {import('rollup').RollupOptions} */
const options = {
  input: './compass/packages/compass-import-export/src/export/export-csv.ts',
  output: {
    file: path.resolve(__dirname, 'lib/export-csv.js'),
    format: 'cjs',
  },
  external: [
    ...require('module').builtinModules,
    'bson',
    'lodash',
    'stream-json/Parser',
    'stream-json/streamers/StreamValues',
    'mongodb/lib/utils',
  ],
  plugins: [
    typescript({
      exclude: [
        'node_modules',
        '**/*.test.ts',
        '**/*.spec.ts',
        'test',
        '**/*.tsx',
      ],
    }),
    alias({
      entries: [
        {
          find: 'compass-preferences-model/provider',
          replacement: path.resolve(__dirname, 'src/preferences-provider'),
        },
        {
          find: 'debug',
          replacement: path.resolve(__dirname, 'src/debug'),
        },
        {
          find: 'mongodb-ns',
          replacement: path.resolve(__dirname, 'src/mongodb-ns'),
        },
      ],
    }),
  ],
};

module.exports = options;
