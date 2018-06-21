let validate = require('validate.js');

import {
  NumericConstraints,
  IntegerConstraints,
  GenderConstraints
} from './implementations/common-constraints';

export function isValidDateTime(value?: Date | null): boolean {
  return validate.isEmpty(value) || validate.isDate(value);
}

export function isValidInteger(value?: number): boolean {
  return validate.single(value, IntegerConstraints) === undefined;
}
