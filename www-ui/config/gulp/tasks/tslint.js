var gulp = require('gulp');
var tslint = require('gulp-tslint');

var tslintTask = function () {
  return gulp.src(['src/**/*.ts'])
    .pipe(tslint())
    .pipe(tslint.report());
}
gulp.task('tslint', tslintTask);
module.exports = tslintTask;
