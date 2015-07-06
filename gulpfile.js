var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var uglifyify = require('uglifyify');
var reactify = require('reactify'); 
var react = require('gulp-react');

gulp.task('transpile-js', function() {
  return gulp.src([
    'app/main.jsx',
    'app/components/*.jsx'], { base : 'app/'})
    .pipe(react({harmony: true}))
    .pipe(gulp.dest('./build/'))
});

gulp.task('react-transform', function() {
    var bundler = browserify({
        entries: ['./build/main.js'],
        debug: false,
        transform: [uglifyify],
        cache: {}, 
        packageCache: {}, 
        fullPaths: false 
    });
    var watcher  = watchify(bundler);
    return watcher
    .on('update', function () {
        watcher.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/'));
    })
    .bundle() 
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['transpile-js', 'react-transform']);