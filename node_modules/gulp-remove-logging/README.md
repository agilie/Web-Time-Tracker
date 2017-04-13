# gulp-remove-logging

[![Build Status](https://img.shields.io/travis/valeriansaliou/gulp-remove-logging/master.svg)](https://travis-ci.org/valeriansaliou/gulp-remove-logging) [![Test Coverage](https://img.shields.io/coveralls/valeriansaliou/gulp-remove-logging/master.svg)](https://coveralls.io/github/valeriansaliou/gulp-remove-logging?branch=master) [![NPM](https://img.shields.io/npm/v/gulp-remove-logging.svg)](https://www.npmjs.com/package/gulp-remove-logging) [![Downloads](https://img.shields.io/npm/dt/gulp-remove-logging.svg)](https://www.npmjs.com/package/gulp-remove-logging) [![Gitter](https://img.shields.io/gitter/room/valeriansaliou/gulp-remove-logging.svg)](https://gitter.im/valeriansaliou/gulp-remove-logging)

Removes all console logging statements from your code.

This plugin is based on the initial work of [@ehynds](https://github.com/ehynds) on [grunt-remove-logging](https://github.com/ehynds/grunt-remove-logging).

## Getting Started

Install this plugin with the command:

```javascript
npm install gulp-remove-logging
```

Next, add this line to your gulpfile:

```javascript
var gulp_remove_logging = require("gulp-remove-logging");
```

Lastly, add the configuration settings (see below) to your gulpfile.

## Task Configuration

```javascript
gulp.task("remove_logging", function() {
  return gulp.src("src/javascripts/**/*.js")
    .pipe(
      gulp_remove_logging({
        // Options (optional)
        // eg:
        // namespace: ['console', 'window.console']
      })
    )
    .pipe(
      gulp.dest(
        "build/javascripts/"
      )
    );
});
```

### Optional Configuration Properties

This plugin can be customized by specifying the following options:

* `replaceWith`: A value to replace logging statements with. This option defaults to an empty string. If you use fancy statements like `console && console.log("foo");`, you may choose to specify a `replaceWith` value like `0;` so that your scripts don't completely break.
* `namespace`: An array of object names that logging methods are attached to.
Defaults to `[ 'console', 'window.console' ]`. If you use a custom logger, like
`MyApp.logger.log(foo)`, you would set this option to `[MyApp.logger]`.
* `methods`: An array of method names to remove. Defaults to [all the methods](http://getfirebug.com/wiki/index.php/Console_API) in the Firebug console API. This option is useful if you want to strip out all `log` methods, but keep `warn` for example.
* `verbose`: Boolean value, whether to show count of logging statements removed for each file. Defaults to true. If false, a single summary line is logged to gulp instead.

### Skip Individual Statements

You can tell this task to keep specific logging statements by adding the comment directive `/*RemoveLogging:skip*/` after the statement:

```javascript
console.log("foo");/*RemoveLogging:skip*/

// or:

console.log("foo")/*RemoveLogging:skip*/;

// whitespace is fine too, whatever floats your boat:

console.log("foo") /* RemoveLogging:skip */;
```
