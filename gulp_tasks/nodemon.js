'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

// nodemon serves server files and restart the server on change
gulp.task('nodemon', cb => {
  return server(cb, '.tmp,./', 'development');
});

gulp.task('nodemon:dist', cb => {
  return server(cb, 'dist');
});

function server(cb, target, nodeEnv) {
  let called = false;

  const environmentVariables = {
    PORT: 3000,
    SESSION_SECRET: 'thecasisinthebox',
    MONGOLAB_URI: 'mongodb://magasin_master:lavieestbelle@ds145405.mlab.com:45405/magasin',
  };

  if(nodeEnv) {
    environmentVariables.NODE_ENV = nodeEnv;
  }

  return nodemon({
    env: environmentVariables,
    script: 'server/app.js',
    // pass comma separated list of directories to be served through the proxy
    // in order of precedence
    args: [target],
    watch: ['server']
  })
    .on('start', () => {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', () => {
      setTimeout(() => {
        livereload.reload();
      }, 1000);
    });
}
