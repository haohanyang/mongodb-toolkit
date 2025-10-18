# MongoDB Toolkit

MongoDB Toolkit is a utility library extracted from [MongoDB Compass](https://github.com/mongodb-js/compass) for exporting data, importing data, analyzing schemas, and more.

## Features

- **Export Data**: Export MongoDB data to CSV or JSON files/streams.
- **Import Data**: Import data from CSV or JSON files/streams into MongoDB.
- **Schema Analysis**: Analyze MongoDB collections to generate schema definitions.

## Installation

To install MongoDB Toolkit, use npm:

```bash
npm install mongodb-toolkit
```

## Usage

### Export Data to CSV

```ts
import { exportCSV } from 'mongodb-toolkit';

const mongoClient = new MongoClient(process.env['MONGO_URI']!);

const cursor = mongoClient
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .aggregate([{ $limit: 10 }, { $project: { listing_url: 1 } }]);

exportCSV(cursor, fs.createWriteStream('output.csv'), {
    delimiter: ';',
    progressCallback: (idx, phase) => {
        console.log(phase, idx);
    },
})
    .then(result => {
        console.log('Export result', result);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoClient.close();
        process.exit(0);
    });
```

### Import CSV File

```ts
import { importCSV } from 'mongodb-toolkit';

const mongoClient = new MongoClient(process.env['MONGO_URI']!);

const coll = mongoClient.db('mydb').collection('mycollection');

/* import.csv content:
id,name
1,John
2,Jane
3,Doe
*/

importCSV(coll, fs.createReadStream('./import.csv'), {
    fields: { id: 'int', name: 'string' },
    delimiter: ',',
})
    .then((result) => {
        console.log('Import Result:', result);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoClient.close();
        process.exit(0);
    });
```

### Analyzing Schema

```ts
import { analyzeSchema } from 'mongodb-toolkit';

const mongoClient = new MongoClient(process.env['MONGO_URI']!);

const cursor = mongoClient
    .db('sample_airbnb')
    .collection('listingsAndReviews')
    .aggregate([{ $limit: 10 }, { $project: { listing_url: 1 } }]);

analyzeSchema(cursor)
    .then((schema) => schema.getMongoDBJsonSchema())
    .then((jsonSchema) => {
        console.log('schema', jsonSchema);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        mongoClient.close();
        process.exit(0);
    });
```
