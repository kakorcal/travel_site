var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {
  // browser sync spins a web server on it own and needs to know where it points to
  // Local: http://localhost:3001 - for your laptop
  // External: http://192.168.1.248:3001 - for your phone (have to use same wifi connection as laptop)
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });

  watch('./app/index.html', function() {
    // hot reload when changes are made to index.html
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    // gulp.start('styles');
    gulp.start('cssInject');
  });

});

// when we change any css file, this task is invoked
// 2nd argument has the dependencies. the callback won't run UNLESS the styles task is completed first
gulp.task('cssInject', ['styles'], function(){
  // this prevents having to do a refresh
  return gulp.src('./app/temp/styles/styles.css')
      .pipe(browserSync.stream());
});