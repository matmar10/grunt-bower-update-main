# grunt-bower-update-main

> Auto-update your bower.json `main` property to include all your module's souce files

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-update-main --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-update-main');
```

## The "bowerUpdateMain" task

### Overview
In your project's Gruntfile, add a section named `bowerUpdateMain` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bowerUpdateMain: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.bowerFilename
Type: `String`
Default value: `bower.json`

Location of your bower.json file. By default, it is read from the project root.

#### options.bowerFileIndent
Type: `Integer`
Default value: `2`

How many spaces should be used as indents within the generated bower.json file.

#### options.outputFilename
Type: `String|Boolean`
Default value: `false`

Specify an alternative location to use for the bower output file. By default, bower.json is overwritten.

#### options.useBowerIgnore
Type: `Boolean`
Default value: `true`

Whether your bower.json file's `ignore` property should be used to automatically exclude files from the generated
array of files for the updated `main` property.

### Usage Examples

#### Default Options
Simplest usage - specify the location of your source files and nothing else.
In this example, all javascript files underneath the `app` folder are included.

```js
grunt.initConfig({
  bowerUpdateMain: {
    target: {
      main: [
        'app/**/*.js'
      ]
    }
  }
});
```

#### Custom Options
This example includes all javascript in the project root except for bower and node modules

```js
grunt.initConfig({
  bowerUpdateMain: {
    target: {
      main: [
        '**/*.js',
        '!bower_components/**/*',
        '!node_modules/**/*',
        '!test/**/*'
      ]
    }
  }
});
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.0 - Initial release (works)
* 0.1.x - Add documentation and test cases
