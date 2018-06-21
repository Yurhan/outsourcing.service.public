var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task("default", function () {
  return runSequence('tslint', 'webpack-dev-server', 'launch-browser');
});

gulp.task("tslint", ['tslint']);

gulp.task('build', function () {
  return runSequence('clean', 'tslint', 'webpack-build-client', 'webpack-build-server');
});
