let validate = require('validate.js');
import * as constants from '../../../models/CONSTANTS';

export const NumericConstraints = {
  numericality: {
    noStrings: true
  }
};

export const IntegerConstraints = {
  numericality: {
    noStrings: true,
    onlyInteger: true
  }
};

export const GenderConstraints = {
  inclusion: {
    within: [constants.GENDER_MAN, constants.GENDER_WOMAN]
  }
};
