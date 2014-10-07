/*
 * grunt-bower-update-main
 * https://github.com/matmar10/grunt-bower-update-main
 *
 * Copyright (c) 2014 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bowerUpdateMain', 'Auto-update your bower.json `main` property to include all your module\'s source files', function () {

    grunt.config.requires('bowerUpdateMain');

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        bowerFilename: 'bower.json',
        bowerFileIndent: 2,
        outputFilename: false,
        useBowerIgnore: true
      }),
      bower,
      outputFilename = options.outputFilename || options.bowerFilename,
      unexpandedFiles = this.data.main || [],
      files,
      i;

    bower = grunt.file.readJSON(options.bowerFilename);
    grunt.verbose.writeln('Existing bower `main` is:');
    grunt.verbose.writeln(bower.main);

    // merge the ignores from `bower.json` as file exclusions in the expandable file array
    if (options.useBowerIgnore) {
      if (bower.ignore && bower.ignore.length) {
        for (i = 0; i < bower.ignore.length; i++) {
          unexpandedFiles.push('!' + bower.ignore[i]);
        }
      }
    }

    grunt.verbose.writeln('Unexpanded `main` file list is:');
    grunt.verbose.writeln(unexpandedFiles);

    // expand things like `**/*.js` and `!*.jade` to be included/excluded accordingly
    bower.main = grunt.file.expand(unexpandedFiles);

    grunt.verbose.writeln('New `main` is:');
    grunt.verbose.writeln(bower.main);

    grunt.log.writeln('Writing ' + outputFilename + ' to include ' + bower.main.length + ' files.');
    grunt.file.write(outputFilename, JSON.stringify(bower, null, options.bowerFileIndent));

  });

};
