'use strict';

var jshint = require('gulp-jshint');
var gulp = require('gulp');
var open = require('gulp-open');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({ lazy: true });
var minify = require('gulp-minify');
var gulp_remove_logging = require("gulp-remove-logging");
var rseq     = require('gulp-run-sequence');
var clean = require('gulp-clean');

gulp.task('start', function(){
    gulp.src('app/first_start.html')
    .pipe(open());
});

gulp.task('vet', function() {
    console.log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('dist', function(cb) {
    // return rseq('min', ['remove_logging'], cb);
    return rseq('clean', ['min'], cb);
});

gulp.task('clean', function() {
    gulp.src('dist/*.js')
        .pipe(clean({force: true}))
});

gulp.task('min', function() {
    gulp.src('app/js/*.js')
        .pipe(gulp_remove_logging({namespace: ['console', 'window.console']}))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'-min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});