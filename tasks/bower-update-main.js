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
        rank: [],
        useBowerIgnore: true
      }),
      bower,
      outputFilename = options.outputFilename || options.bowerFilename,
      unexpandedFiles = this.data.main || [],
      files,
      i;

    bower = grunt.file.readJSON(options.bowerFilename);
    // grunt.verbose.writeln('Existing bower `main` is:');
    // grunt.verbose.writeln(bower.main);

    // merge the ignores from `bower.json` as file exclusions in the expandable file array
    if (options.useBowerIgnore) {
      if (bower.ignore && bower.ignore.length) {
        for (i = 0; i < bower.ignore.length; i++) {
          unexpandedFiles.push('!' + bower.ignore[i]);
        }
      }
    }

    bower.main = [];

    if (options.rank.length) {
      var ranked = [], rankedBatches;

      rankedBatches = [];
      this.filesSrc.forEach(function (file) {
        var found = false, i;

        for (i = 0; i < options.rank.length; i++) {
          if (file.match(options.rank[i])) {
            rankedBatches[i] = rankedBatches[i] || [];
            rankedBatches[i].push(file);
            found = true;
            break;
          }
        }

        if (!found) {
          i++;
          rankedBatches[i] = rankedBatches[i] || [];
          rankedBatches[i].push(file);
        }

      }.bind(this));

      for (i = 0; i < rankedBatches.length; i++) {
        // TODO: not sure why we have an undefined element in the array
        if (!rankedBatches[i]) {
          continue;
        }
        ranked = ranked.concat(rankedBatches[i]);
      }

      bower.main = ranked;
    } else {
      this.files.forEach(function (file) {
        bower.main.push(file.src);
      });
    }

    grunt.verbose.writeln('New `main` is:');
    grunt.verbose.writeln(bower.main);

    grunt.log.writeln('Writing ' + outputFilename + ' to include ' + bower.main.length + ' files.');
    grunt.file.write(outputFilename, JSON.stringify(bower, null, options.bowerFileIndent));

  });

};
