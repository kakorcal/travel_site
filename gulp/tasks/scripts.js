var gulp = require('gulp'),
webpack = require('webpack-stream'),
config = require('../../webpack.config');

gulp.task('scripts', function(done){
  return gulp.src('./app/assets/scripts/App.js')
    .pipe(webpack(config))
    .on('error', function(error){
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/scripts'));
  
  // only applies to webpack 1
  // webpack(config, function(error, stats){
  //   if(error) {
  //     console.log(error.toString());
  //   }
  //   // console.log(stats);
  //   done(); // gulp will now know that the task is complete
  //           // we need this cause the return statement is not present
  // });
});