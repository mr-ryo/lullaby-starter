import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import pleeease from 'gulp-pleeease';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import notify from "gulp-notify";
import browserSync from 'browser-sync';

const SRC = './src';
const HTDOCS = './public';
const BASE_PATH = '';
const DEST = `${HTDOCS}${BASE_PATH}`;
const TEST = '.';

gulp.task('html', () => {
  return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(`${DEST}`))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', () => {
  return gulp.src(`${SRC}/scss/style.scss`)
  .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: 'expanded',
    pretty: true
  }))
  .pipe(pleeease({
    autoprefixer: true,
    minifier: false,
    mqpacker: true
  }))
  .pipe(gulp.dest(`${DEST}/css`))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', () => {
  return gulp.src(`${SRC}/js/script*`)
  .pipe(babel())
  .pipe(gulp.dest(`${DEST}/js`))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('image', () => {
  return gulp.src(`${SRC}/images/*.png`)
  .pipe(gulp.dest(`${DEST}/images`))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: HTDOCS
    },
    startPath: `${BASE_PATH}/`,
    ghostMode: false
  });
});

gulp.task('watch', ['html', 'css', 'js', 'image', 'browser-sync'], () => {
  gulp.watch('src/**/*.pug', ['html']);
  gulp.watch(src.css, ['css']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.image, ['image']);
});

gulp.task('default', ['watch']);
