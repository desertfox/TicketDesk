var gulp = require('gulp');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var browserify = require('gulp-browserify');

gulp.task('transpile-js', function() {
   return gulp.src([
    'app/main.jsx',
    'app/components/*.jsx'], { base : 'app/'})
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('webify', ['transpile-js'], function() {
    return gulp.src('build/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./build/'));
});

gulp.task('ugly', ['webify'], function() {
   return gulp.src('build/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});
gulp.task('default', ['transpile-js', 'webify', 'ugly']);