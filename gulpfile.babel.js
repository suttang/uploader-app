const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const electron = require('electron-connect').server.create();


gulp.task('serve', () => {
  // Start browser process
  electron.start();

  // Restart browser process
  gulp.watch(['main.js', 'app/menu.js'], electron.restart);

  // Reload renderer process
  gulp.watch(['renderer/**/*.html'], electron.reload);
});


gulp.task('reload:browser', () => {
  electron.restart();
});


gulp.task('reload:renderer', () => {
  // Reload renderer process
  electron.reload();
});


gulp.task('sass', (done) => {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css/'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./assets/css/'))
    .on('end', done);
});


gulp.task('watch', ['sass', 'serve'], () => {
  gulp.watch('./assets/scss/**/*.scss', ['sass', 'reload:renderer']);
});


gulp.task('default', ['watch']);
