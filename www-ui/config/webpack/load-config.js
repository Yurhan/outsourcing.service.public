var _ = require('lodash');
var config = require('config');

const CONFIG = {
  port: config.get('port'),
};

if (config.has('logConfigSources') && _.lowerCase(config.get('logConfigSources')) === 'true') {
  var configSources = JSON.stringify(config.util.getConfigSources());
}

if (config.has('logConfig') && _.lowerCase(config.get('logConfig')) === 'true') {
  var configSources = JSON.stringify(CONFIG);
}

exports.CONFIG = CONFIG;
