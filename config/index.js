'use strict';

var configSource = process.env.NODE_ENV || 'test';
module.exports = require('./env/' + configSource);