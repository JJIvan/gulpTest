var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});