
// basic
var gulp = require('gulp');
var browserSync = require('browser-sync');

// gulp plugins
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

  watch('./src/styles/**/*.sass', function () {
    gulp.run('styles');
  });
  watch('./src/**/*.jade', function () {
    gulp.run('templates');
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
});

// convert html
gulp.task('templates', function() {
    gulp.src('./src/**/*.jade')
        .pipe(jade({
          locals: {}
        }))
        .pipe(gulp.dest('./public/'));
});

// define default task(s)
gulp.task('default', ['watch', 'serve-dev']);
