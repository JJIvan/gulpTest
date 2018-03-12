var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('concat', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});
gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/stylesheet'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});
gulp.task('default',['concat','sass','sass:watch'])