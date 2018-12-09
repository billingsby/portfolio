const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('styles', () => {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('scripts', () => {
    gulp.src('js/**/*.js')
      .pipe(babel().on('error', babel.logError))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

//Watch task
gulp.task('default', () => {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('js/**/*.js',['scripts']);
});