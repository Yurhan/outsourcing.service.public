var gulp = require('gulp');
var del = require('del');

var cleanTask = function () {
  return del.sync(__dirname + '/../../../dist/**/*');
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
