var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .on('error', function(err){
      // the workflow will not be interrupted by css errors such as misspelling, undefined variables
      // we can still log the error so we can debug
      console.log(err.toString());
      // the watch task looks for 'end' to see if the task called has ended
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});