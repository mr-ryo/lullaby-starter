var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var browserSync = require('browser-sync');

var src = {
  'html': ['src/**/*.pug', '!' + 'src/**/_*.pug'],
  'css': ['src/**/*.scss', 'src/**/*.sass', 'src/**/*.css'],
  'js': 'src/**/*.js',
  'image': ['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif'],
  'bootstrap': ['src/**/*.eot', 'src/**/*.svg', 'src/**/*.ttf', 'src/**/*.woff', 'src/**/*.woff2'],
};

var dest = {
  'root': 'dest/',
  'html': 'dest/'
};

gulp.task('html', function() {
  return gulp.src(src.html)
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(dest.html))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function() {
  return gulp.src(src.css)
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sass({
    outputStyle: 'expanded',
    pretty: true
  }))
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src(src.js, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('image', function() {
  return gulp.src(src.image, {base: src.root})
  .pipe(gulp.dest(dest.root))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('bootstrap', function() {
  return gulp.src(src.bootstrap, {base: src.root})
  .pipe(gulp.dest(dest.root));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: dest.root,
      index: "index.html"
    }
  });
});

gulp.task('watch', ['html', 'css', 'js', 'image', 'bootstrap', 'browser-sync'], function() {
  gulp.watch('src/**/*.pug', ['html']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.image, ['image']);
  gulp.watch(src.bootstrap, ['bootstrap']);
});

gulp.task('default', ['watch']);
