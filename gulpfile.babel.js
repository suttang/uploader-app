const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const useref = require('gulp-useref');

const electron = require('electron-connect').server.create({
  path: `${__dirname}/app/main`,
});

gulp.task('serve', () => {
  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch(['app/main/**/*.js'], electron.restart);

  // Reload renderer process
  gulp.watch(['app/renderer/**/*.html'], electron.reload);
});

gulp.task('reload:browser', () => {
  electron.restart();
});

gulp.task('reload:renderer', () => {
  electron.reload();
});

gulp.task('sass', (done) => {
  gulp.src('./app/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/assets/css/'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/assets/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass', 'serve'], () => {
  gulp.watch('./app/assets/scss/**/*.scss', ['sass', 'reload:renderer']);
});

gulp.task('default', ['watch']);
