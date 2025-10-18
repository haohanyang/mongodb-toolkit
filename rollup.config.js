const path = require('path');
const typescript = require('@rollup/plugin-typescript');
const alias = require('@rollup/plugin-alias');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('rollup').RollupOptions} */
const options = {
  input: {
    'export-csv':
      './compass/packages/compass-import-export/src/export/export-csv.ts',
    'export-json':
      './compass/packages/compass-import-export/src/export/export-json.ts',
    'schema-analysis':
      './compass/packages/compass-schema/src/modules/schema-analysis.ts',
    'import-csv':
      './compass/packages/compass-import-export/src/import/import-csv.ts',
    'import-json':
      './compass/packages/compass-import-export/src/import/import-json.ts',
    'analyze-csv-fields':
      './compass/packages/compass-import-export/src/import/analyze-csv-fields.ts',
    'guess-filetype':
      './compass/packages/compass-import-export/src/import/guess-filetype.ts',
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
    'stream-json',
    new RegExp('stream-json/.*'),
    'mongodb/lib/utils',
    'mongodb-schema',
    'papaparse',
    'strip-bom-stream',
  ],
  plugins: [
    typescript({
      compilerOptions: {
        target: 'ES2015',
      },
      include: ['./compass/packages/**/*.ts', './vendors/*.ts'],
      exclude: [
        'node_modules',
        '**/*.test.ts',
        '**/*.spec.ts',
        'test',
        'scripts',
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
          replacement: path.resolve(
            __dirname,
            isProduction ? 'vendors/debug' : 'vendors/debug-dev',
          ),
        },
        {
          find: 'mongodb-ns',
          replacement: path.resolve(__dirname, 'vendors/mongodb-ns'),
        },
        {
          find: 'hadron-document',
          replacement: path.resolve(__dirname, 'vendors/hadron-document'),
        },
        {
          find: 'bson',
          replacement: path.resolve(__dirname, 'vendors/bson'),
        },
      ],
    }),
  ],
};

module.exports = options;
