/*
 * gulp-remove-logging
 * Based on ehynds/grunt-remove-logging
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var gulp_replace  = require("gulp-replace");


exports.proceed = function(opts) {
  var regex_console = new RegExp(
    ("(" + opts.namespace.join("|") + ")" +
        ".(?:" + opts.methods.join("|") +
        ")\\s{0,}\\([^;]*\\)(?!\\s*[;,]?\\s*\\/\\*\\s*" +
        "RemoveLogging:skip\\s*\\*\\/)\\s{0,};?"),
    "gi"
  );

  return gulp_replace(
    regex_console, (opts.replaceWith || "")
  );
};
