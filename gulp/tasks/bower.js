var gulp        = require('gulp');
var bowerFiles  = require('gulp-bower-files');
var inject      = require('gulp-inject');

gulp.task('bower', function() {
  gulp.src('./public/index.html')
  .pipe(inject(bowerFiles({read: false}), {ignorePath: '/public'}))
  .pipe(gulp.dest('./public/'));
});
