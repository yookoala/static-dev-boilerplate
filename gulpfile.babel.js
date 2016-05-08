'use strict';

// basic
import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';

// gulp plugins
import gutil from 'gulp-util';
import jade from 'gulp-jade';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';

// webpack config
import webpackCfg from './configs/webpack.babel.config';

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
  gulp.watch([
    './src/styles/**/*.sass',
    './src/styles/**/*.scss'
  ], ['styles']);
  gulp.watch('./src/**/*.jade', ['templates']);
  gulp.watch('./src/scripts/**/*.*', ['webpack']);
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
