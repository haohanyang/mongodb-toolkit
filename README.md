# MongoDB Toolkit

MongoDB Toolkit is a utility library extracted from [MongoDB Compass](https://github.com/mongodb-js/compass) for exporting data, analyzing schemas, and more.

## Features

- **Export Data**: Export MongoDB data to CSV or JSON formats.
- **Schema Analysis**: Analyze MongoDB collections to generate schema definitions.

## Installation

To install MongoDB Toolkit, use npm:

```bash
npm install mongodb-toolkit
```

## Usage

### Exporting Data to CSV

```javascript
const { exportCSV, importCSV } = require('mongodb-toolkit');

const mongoClient = new MongoClient('mongodb://localhost:27017');

const cursor = mongoClient
  .db('mydb')
  .collection('mycollection')
  .aggregate([{ $limit: 10 }]);

exportCSV(cursor, fs.createWriteStream('output.csv'), {
  delimiter: ';',
  progressCallback: (idx, phase) => {
    console.log(phase, idx);
  },
})
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoClient.close();
    process.exit(0);
  });
```

### Importing CSV Data

```javascript
const { importCSV } = require('mongodb-toolkit');

const mongoClient = new MongoClient('mongodb://localhost:27017');

const coll = mongoClient.db('mydb').collection('mycollection');

importCSV(coll, fs.createReadStream('example.csv'), {
  fields: { id: 'int', name: 'string' },
})
  .then((result) => {
    console.log(`Import result`, result);
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

```javascript
const { analyzeSchema } = require('mongodb-toolkit');

const mongoClient = new MongoClient('mongodb://localhost:27017');

const cursor = mongoClient
  .db('mydb')
  .collection('mycollection')
  .aggregate([{ $limit: 10 }]);

analyzeSchema(cursor)
  .then((schema) => schema.getMongoDBJsonSchema())
  .then((jsonSchema) => {
    console.log(jsonSchema);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    mongoClient.close();
    process.exit(0);
  });
```
