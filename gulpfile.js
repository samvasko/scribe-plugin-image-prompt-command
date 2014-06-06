var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

gulp.task('default', ['browserify'], function () {
    gulp.watch('./src/*.js', ['browserify']);
});

gulp.task('build', ['browserify', 'uglify']);

gulp.task('browserify', function () {
    var b = browserify('./src/scribe-plugin-image-prompt-command.js');
    b.bundle({
        standalone: 'scribe-plugin-image-prompt-command',
    }).pipe(source('scribe-plugin-image-prompt-command.js'))
        .pipe(gulp.dest('.'));
});

var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
    gulp.src('./scribe-plugin-image-prompt-command.js')
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('.'))
});