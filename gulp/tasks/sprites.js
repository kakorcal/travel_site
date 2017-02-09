var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

// https://github.com/jkphl/gulp-svg-sprite
var config = {
  mode:  {
    css: {
      sprite: 'sprite.svg', // remove .css from sprite filename
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};

gulp.task('beginClean', function(){
  // delete outdated sprite files
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

// use sprite as background image
gulp.task('createSprite', ['beginClean'], function(){
  return gulp.src('./app/assets/images/icons/**/*.svg') // adding icons to gulps pipeline
    .pipe(svgSprite(config)) // transform them into sprite
    .pipe(gulp.dest('./app/temp/sprite/')); // copy all svgs to another directory
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites')); // move to images directory
});

gulp.task('copySpriteCSS', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css')) // rename as partial
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
  return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);