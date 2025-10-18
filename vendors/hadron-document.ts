// packages/hadron-document/src/utils.ts

import { EJSON } from 'bson';

const maxFourYearDate = new Date('9999-12-31T23:59:59.999Z').valueOf();

export function objectToIdiomaticEJSON(value: any, options: any = {}): string {
  const serialized = EJSON.serialize(value, {
    relaxed: false,
  });

  makeEJSONIdiomatic(serialized);

  return JSON.stringify(
    serialized,
    null,
    'indent' in options ? options.indent : 2,
  );
}

function makeEJSONIdiomatic(value: any): void {
  if (!value || typeof value !== 'object') return;

  for (const key of Object.keys(value)) {
    const entry = value[key];
    // We are only interested in object-like values, skip everything else
    if (typeof entry !== 'object' || entry === null) {
      continue;
    }
    if (entry.$numberInt) {
      value[key] = +entry.$numberInt;
      continue;
    }
    if (entry.$numberDouble) {
      if (
        Number.isFinite(+entry.$numberDouble) &&
        !Object.is(+entry.$numberDouble, -0)
      ) {
        // EJSON can represent +/-Infinity or NaN values but JSON can't
        // (and -0 can be parsed from JSON but not serialized by JSON.stringify).
        value[key] = +entry.$numberDouble;
      }
      continue;
    }
    if (entry.$date && entry.$date.$numberLong) {
      const number = entry.$date.$numberLong;
      if (number >= 0 && number <= maxFourYearDate) {
        entry.$date = new Date(+number).toISOString();
      }
    }
    makeEJSONIdiomatic(entry);
  }
}
