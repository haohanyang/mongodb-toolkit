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

Examples use [MongoDB Sample Datasets](https://www.mongodb.com/docs/atlas/sample-data/)

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
  .then((result) => {
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

CSV content (import.csv):

```csv
id,name
1,John
2,Jane
3,Doe
```

```ts
import { importCSV } from 'mongodb-toolkit';

const mongoClient = new MongoClient(process.env['MONGO_URI']!);

const coll = mongoClient.db('mydb').collection('mycollection');

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

// Sample 100 docs
const cursor = mongoClient
  .db('sample_mflix')
  .collection('comments')
  .aggregate([{ $limit: 100 }]);

const controller = new AbortController();

// Abort the analysis after 1 second
setTimeout(() => {
  controller.abort();
}, 1000);

analyzeSchema(cursor, { abortSignal: controller.signal })
  .then((schema) => schema.getMongoDBJsonSchema())
  .then((jsonSchema) => {
    if (!schema) {
      // Aborted
      throw new Error('Schema analysis aborted');
    }
    console.log(JSON.stringify(jsonSchema, null, 2));
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoClient.close();
    process.exit(0);
  });
```

Output

```
{
  "bsonType": "object",
  "required": [
    "_id",
    "date",
    "email",
    "movie_id",
    "name",
    "text"
  ],
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "date": {
      "bsonType": "date"
    },
    "email": {
      "bsonType": "string"
    },
    "movie_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string"
    },
    "text": {
      "bsonType": "string"
    }
  }
}
```
