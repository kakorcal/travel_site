var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

// gulp-modernizr will let us create our custom modernizr file to limit the file size of the modernizr.js
// so we are able to test for features we only have to test for
// gulp-modernizr will automatically go thru the code in src and create a minimal modernizr file
gulp.task('modernizr', function(){
  return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
    .pipe(modernizr({
      'options': [
        'setClasses'
      ]
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});