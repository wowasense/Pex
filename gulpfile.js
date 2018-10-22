//Список модулей

var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

// Настройка browserSync

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

// Настройка компилятора Less

gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Настройка минификации

gulp.task('mincss', function(){
  return gulp.src("src/css/*.css")
    .pipe(rename({suffix: ".min"}))
    .pipe(cleanCSS())
    .pipe(gulp.dest("src/css"));
});

//watch settings
gulp.task('watch', ['browser-sync', 'less'], function() {
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/*.js', browserSync.reload);
});

//set default task
gulp.task('default', ['watch']);
