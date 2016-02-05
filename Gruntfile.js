// Gruntfile.js

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      install: {
        options: {
          targetDir: 'src/js/libs'
        }
      }
    },

    wiredep: {
      target: {
        src: 'src/index.html'
      }
    },
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['bower','wiredep']);
};
