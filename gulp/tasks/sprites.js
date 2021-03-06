var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

// https://github.com/jkphl/gulp-svg-sprite
var config = {
  shape: {
    spacing: {
      padding: 1 // this adds padding around each pic in sprite
    }
  },
  mode:  {
    css: {
      variables: {
        replaceSvgWithPng: function(){
          return function(sprite, render) {
            // sprite is the dynamic filename
            // replacing svg with png
            return render(sprite).split('.svg').join('.png'); 
          };
        }
      },
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

gulp.task('createPngCopy', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

