'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');

gulp.task('default', 'watch');
gulp.task('build', ['sass', 'js', 'hugo']);
gulp.task('watch', ['sass:watch', 'js:watch']);

//----------------------------------------
// Hugo
//----------------------------------------

// TODO

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
    .pipe(gulp.dest('./static/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
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
    .pipe(gulp.dest('./static/js'));
});

gulp.task('js:watch', function () {
  gulp.watch('./static/js/**/*.js', ['js']);
});
