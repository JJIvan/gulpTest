var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var  watch = require('gulp-watch'); 
var htmlmin = require('gulp-htmlmin');  
/*------------------先執行這段 gulp--------------------------------------------*/
gulp.task('concat', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/stylesheet'));
});

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
/*-------------------------------------------------------------*/







/*------------執行gulp run--- liverel執行oad---------------------------------------------------*/

gulp.task('Wconcat', function() {
    return watch('./src/**/*.js', function () {   //監看src目錄底下的所有js檔
        gulp.src('./src/**/*.js')                 //設定來源檔案為src目錄底下的所有js檔
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/'))      //輸出至build目錄底下
            .pipe(connect.reload());            //利用connect套件刷新頁面
    });
});


gulp.task('Wsass', function () {
    return watch('./src/**/*.scss', function () {     //監看src目錄底下的所有scss檔
        gulp.src('./src/**/*.scss')                //設定來源檔案為src目錄底下的所有scss檔
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/stylesheet'))             //輸出至build目錄底下
            .pipe(connect.reload());                 //利用connect套件刷新頁面
    });
});


gulp.task('WhtmlGO', function () {
    return watch('./src/**/*.html', function () {
        gulp.src('./src/**/*.html') 
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload());                 //利用connect套件刷新頁面
    });
});


gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

/*--------------------------------------------------------*/
gulp.task('default',['concat','sass','minify'])
gulp.task('run',['Wconcat','Wsass','connect','WhtmlGO'])