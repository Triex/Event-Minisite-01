// TODO: Better browser-sync reload timing: https://www.browsersync.io/docs/gulp/

'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('default', 'watch');
gulp.task('build', ['sass', 'js', 'hugo']);
gulp.task('watch', ['serve']);
gulp.task('watch', ['sass:watch', 'js:watch']);

//----------------------------------------
// Browser Sync
//----------------------------------------

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'js'], function() {

    browserSync.init({
        server: "./../../public",
    });

    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch('./static/js/**/*.js', ['js']);
    gulp.watch(["./../../content/**/*.md"], ['hugo']);
    gulp.watch("./../../public/**/*.html").on('change', browserSync.reload);
});

//----------------------------------------
// Hugo
//----------------------------------------

gulp.task('hugo', function () {
  // TODO
});

//----------------------------------------
// CSS
//----------------------------------------

gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
			browsers: ['last 2 versions'],
			cascade: false,
		}))
    .pipe(sourcemaps.write('./static/css/maps'))
    .pipe(gulp.dest('./static/css'))
    .pipe(browserSync.stream());
});

//----------------------------------------
// JS
//----------------------------------------

gulp.task('js', function () {
  return gulp.src(['./static/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // TODO: Optimise JS
    .pipe(sourcemaps.write('./static/js/maps'))
    .pipe(gulp.dest('./static/js'))
    .pipe(browserSync.stream());
});
