'use strict';

module.exports = {
  karma: {
    browsers: ['Chrome'],
    preprocessors: {
      'src/js/*.js': 'coverage',
      'test/*.html' : ['html2js']
    },
    reporters: ['progress', 'coverage'],
    autoWatch: false,
    singleRun: true
  }
};