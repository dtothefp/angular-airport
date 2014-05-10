var gulp         = require('gulp');
var concat       = require('gulp-concat');
var livereload   = require('gulp-livereload');
var notify       = require('gulp-notify');
var handleErrors = require('../util/handleErrors');
var jshint       = require('gulp-jshint');
var ngmin        = require('gulp-ngmin');
var order        = require('gulp-order');
var streamqueue  = require('streamqueue');

// gulp.task('scripts', function() {
//     gulp.src(['./src/config/{,**/}.*js', './src/services/{,**/}*.js', './src/modules/**/*.js', './src/primitives/**/*.js'])
//         .pipe(gulp.dest('./build/js'))
//         .on('error', handleErrors)
//         .pipe(livereload());
// });

gulp.task('scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./public/src/js/config.js'),
        gulp.src('./public/src/js/services.js'),
        gulp.src('./public/src/js/controllers.js'),
        gulp.src('./public/src/js/directives.js')
    )
        .pipe(concat('app.js'))
        //.pipe(ngmin({dynamic: true}))
        .pipe(gulp.dest('public/build/js'))
        .on('error', handleErrors)
        .pipe(livereload());
});
