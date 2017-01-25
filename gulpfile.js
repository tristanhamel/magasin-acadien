const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const livereload = require('gulp-livereload');
// const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist')));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'nodemon', 'watch'));
gulp.task('serve:dist', gulp.series('default', 'nodemon:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

// function reloadBrowserSync(cb) {
//   // browserSync.reload();
//   livereload.reload();
//   cb();
// }
//
// function watch(done) {
//   gulp.watch(conf.path.src('app/**/*.html'), reloadBrowserSync);
//   done();
// }

gulp.task('watch', watch);

function reload(done) {
  livereload.reload();
  done();
}

function watch(done) {
  livereload.listen();

  gulp.watch(conf.path.tmp('app.js'), reload);
  done();

  // // if the generated css file has changed, pass it to the browser without hard reloading
  // const cssWatch = gulp.watch(conf.path.tmp('app.css'));
  // cssWatch.on('change', () => {
  //   livereload.changed('app.css');
  // });
}
