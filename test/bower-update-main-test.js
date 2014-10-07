'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.bowerUpdateMain = {
  setUp: function(done) {
    done();
  },

  defaultOptions: function(test) {
    test.expect(1);

    var actual = grunt.file.read('bower.json');
    var expected = grunt.file.read('test/expected/default-bower.json');
    test.equal(actual, expected, 'Grunt updates bower.json using default options');

    test.done();
  },

  defaultWithoutIgnore: function (test) {
    test.expect(1);

    var actual = grunt.file.read('.tmp/default-bower-without-ignore.json');
    var expected = grunt.file.read('test/expected/default-bower-without-ignore.json');
    test.equal(actual, expected, 'Grunt updates bower.json using default options');

    test.done();
  },

  exampleProject1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('.tmp/example-project-1-bower.json');
    var expected = grunt.file.read('test/expected/example-project-1-bower.json');
    test.equal(actual, expected, 'Grunt generates bower.json with updated `main` property including all the source files specified');

    test.done();
  }
};
