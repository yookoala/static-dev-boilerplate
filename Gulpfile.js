
// basic
var gulp = require('gulp');
var browserSync = require('browser-sync');
var webpack = require('webpack');

// gulp plugins
var gutil = require("gulp-util");
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

// watch the public files
// hot reload if there is changes
gulp.task('serve-dev', function() {

  var files = [
    'public/**/*.html',
    'public/styles/**/*.css',
    'public/scripts/**/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './public'
    }
  });

});

// watch the source files
// generates public files
gulp.task('watch', function() {

  watch([
    './src/styles/**/*.sass',
    './src/styles/**/*.scss'
  ], function () {
    gulp.run('styles');
  });
  watch('./src/**/*.jade', function () {
    gulp.run('templates');
  });
  watch('./src/scripts/**/*.*', function () {
    gulp.run('webpack');
  });

});

// convert styles
gulp.task('styles', function() {
    gulp.src('./src/styles/*.sass')
        .pipe(sass({
          errLogToConsole: true
        }))
        .pipe(minifyCss({
          compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public/styles/'));

    gulp.src('./src/styles/*.scss')
        .pipe(sass())
        .pipe(minifyCss({
          compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public/styles/'));
});

// convert html
gulp.task('templates', function() {
    gulp.src([
          './src/**/*.jade',
          '!./src/includes/**/*.jade'
        ])
        .pipe(jade({
          locals: {}
        }))
        .pipe(gulp.dest('./public/'));
});

// bundle scripts
gulp.task("webpack", function(callback) {

  var webpackCfg = require('./webpack.config');

  // run webpack
  webpack(webpackCfg, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
        // output options
    }));
    callback();
  });
});

// build the source files
gulp.task('build', ['styles', 'templates', 'webpack']);

// define default task(s)
gulp.task('default', ['build', 'watch', 'serve-dev']);
