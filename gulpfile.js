var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify')
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var pkg = require('./package.json');
var target = './build/';

gulp.task('default', ['browserify'], function () {
    gulp.watch(['./src/*.js', 'test/main_test.js'], ['browserify']);
});

gulp.task('browserify', function () {
    var b = browserify('./' + pkg.main);
    b.bundle({debug: true, standalone: pkg.name})
        .on('error', gutil.log)
        .pipe(source(pkg.name + '.js'))
        .pipe(gulp.dest(target));

    var t = browserify('./test/main_test.js');
    t.bundle({debug: true})
        .on('error', gutil.log)
        .pipe(source('tests.js'))
        .pipe(gulp.dest(target));
});

gulp.task('clean', function () {
    gulp.src(target, {read: false}).pipe(clean());
});

gulp.task('build', ['clean'], function () {
    var b = browserify('./' + pkg.main);
    b.bundle({standalone: pkg.name})
        .on('error', gutil.log)
        .pipe(source(pkg.name + '.js'))
        .pipe(gulp.dest(target))
        .pipe(streamify(uglify()))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(target))
});