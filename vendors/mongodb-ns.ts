import { MongoDBCollectionNamespace } from 'mongodb/lib/utils';

export default function (ns: string) {
  return MongoDBCollectionNamespace.fromString(ns);
}
