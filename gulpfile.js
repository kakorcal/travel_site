require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/sprites');



/*
var gulp = require('gulp'),
watch = require('gulp-watch');
gulp.task('default', function() {
  console.log("Hooray - you created a Gulp task.");
});

gulp.task('html', function() {
  console.log("Imagine something useful being done to your HTML here.");
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles')); 
}); 
*/

