var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');

gulp.task('copy', function() {
  gulp.src('./public/templates/*.html')
    .pipe( minifyHtml({empty: true}) )
    .pipe(gulp.dest('build/templates/'));
});
