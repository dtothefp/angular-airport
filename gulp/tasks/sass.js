var sass      = require('gulp-sass');
var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var notify       = require('gulp-notify');
var handleErrors = require('../util/handleErrors');
var concat       = require('gulp-concat');

// gulp.task('compass', function() {
// 	return gulp.src('./src/sass/*.sass')
// 		.pipe(compass({
// 			config_file: 'compass.rb',
// 			css: 'build',
// 			sass: 'src/sass'
// 		}))
// 		.on('error', handleErrors)
// 		.pipe(livereload());
// });

gulp.task('sass', function() {
    gulp.src('public/src/sass/*.scss')
        .pipe(sass({includePaths: ['public/bower_components/foundation/scss']}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('public/build/css'))
        .on('error', handleErrors)
        .pipe(livereload());
});
