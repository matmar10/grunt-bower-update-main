/*
 * grunt-bower-update-main
 * https://github.com/matmar10/grunt-bower-update-main
 *
 * Copyright (c) 2014 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bowerUpdateMain: {
      defaultOptions: {
        options: {},
        main: [
          '**/*.js'
        ]
      },
      defaultWithoutIgnore: {
        options: {
          outputFilename: '.tmp/default-bower-without-ignore.json',
          useBowerIgnore: false
        },
        main: [
          '**/*.js',
          "!.tmp/**/*",
          "!node_modules/**/*",
          "!bower_components/**/*"
        ]
      },
      exampleProject1: {
        options: {
          bowerFilename: './test/fixtures/example-project-1-bower.json',
          bowerFileIndent: 4,
          outputFilename: '.tmp/example-project-1-bower.json'
        },
        main: [
          'test/fixtures/example-project-1-files/**/*.js'
        ]
      },
      exampleProject2: {
        options: {
          bowerFilename: './test/fixtures/example-project-2-bower.json',
          bowerFileIndent: 2,
          outputFilename: '.tmp/example-project-2-bower.json'
        },
        main: [
          'test/fixtures/example-project-2-files/**/*.js'
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*-test.js']
    },

    // Auto-magically rev, tag, npm publish
    release: {
      github: {
        repo: 'matmar10/grunt-bower-update-main'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'bowerUpdateMain', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
