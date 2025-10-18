const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');

/** @type {import('rollup').RollupOptions} */
const options = {
  input: {
    'export-csv':
      './compass/packages/compass-import-export/src/export/export-csv.ts',
    'export-json':
      './compass/packages/compass-import-export/src/export/export-json.ts',
    'schema-analysis':
      './compass/packages/compass-schema/src/modules/schema-analysis.ts',
  },
  output: {
    dir: path.resolve(__dirname, 'lib'),
    format: 'cjs',
    entryFileNames: '[name].js',
  },
  external: [
    ...require('module').builtinModules,
    'bson',
    'lodash',
    'stream-json/Parser',
    'stream-json/streamers/StreamValues',
    'mongodb/lib/utils',
    'mongodb-schema',
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
          replacement: path.resolve(__dirname, 'vendors/preferences-provider'),
        },
        {
          find: 'debug',
          replacement: path.resolve(__dirname, 'vendors/debug'),
        },
        {
          find: 'mongodb-ns',
          replacement: path.resolve(__dirname, 'vendors/mongodb-ns'),
        },
        {
          find: 'hadron-document',
          replacement: path.resolve(__dirname, 'vendors/hadron-document'),
        },
      ],
    }),
  ],
};

module.exports = options;
