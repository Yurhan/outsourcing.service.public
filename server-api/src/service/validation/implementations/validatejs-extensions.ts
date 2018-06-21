let validate = require('validate.js');

validate.validators.boolean = function (value, options, key, attributes): string | undefined {
  // First validate the configuration of this validator
  if (options.equalTo !== undefined && !validate.isBoolean(options.equalTo)) {
    throw new Error(`boolean validator for ${key} misconfigured. \'equalTo\' must be a boolean`);
  }

  // Finally validate the value
  if (!validate.isBoolean(value)) {
    return 'must be a boolean';
  }

  if (options.equalTo !== undefined && value !== options.equalTo) {
    return `must be ${options.equalTo}`;
  }
};

module.exports = validate;
