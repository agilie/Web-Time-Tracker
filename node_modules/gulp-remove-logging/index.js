/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var remove_logging  = require("./lib/removelogging");


module.exports = function(opts) {
  opts = opts || {};

  // Use console as the default namespace
  if (!("namespace" in opts)) {
    opts.namespace = [
      "console",
      "window.console"
    ];
  }

  // Default methods
  if (!("methods" in opts) || (typeof opts.methods !== "object")) {
    opts.methods = [
      "log",
      "info",
      "warn",
      "error",
      "assert",
      "count",
      "clear",
      "group",
      "groupEnd",
      "groupCollapsed",
      "trace",
      "debug",
      "dir",
      "dirxml",
      "profile",
      "profileEnd",
      "time",
      "timeEnd",
      "timeStamp",
      "table",
      "exception"
    ];
  }

  if (!("verbose" in opts)) {
    opts.verbose = true;
  }

  // Proceed transform
  return remove_logging.proceed(opts);
};
