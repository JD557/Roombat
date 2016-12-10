const gulp = require('gulp');
const babel = require('gulp-babel')
const serve = require('gulp-serve')

gulp.task('copy-js-dependencies', function() {
  return gulp.src('src/js/deps/*.js')
             .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-js', ['copy-js-dependencies'], function() {
  return gulp.src('src/js/*.js')
             .pipe(babel({presets: ['es2015']}))
             .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-html', function() {
  return gulp.src('src/html/*.html')
             .pipe(gulp.dest('dist'));
});


gulp.task('compile-css', function() {
  return gulp.src('src/css/*.css')
             .pipe(gulp.dest('dist/css'));
});

gulp.task('compile-resources', function() {
  return gulp.src('src/res/*')
             .pipe(gulp.dest('dist/res'));
});

gulp.task('default', ['compile-js', 'compile-html', 'compile-css', 'compile-resources']);

gulp.task('serve', ['default'], serve('dist'))
