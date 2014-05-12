var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function(){
	gulp.watch('public/src/js/{,**/}*.js', ['scripts']);
	gulp.watch('public/src/sass/{,**/}*.scss', ['sass']);
	gulp.watch('public/src/images/**', ['images']);
  gulp.watch('./public/src/js/templates/**/*.html', ['templates']);
	livereload();
});
