let gulp = require('gulp');
let tslint = require('gulp-tslint');
let ts = require('gulp-typescript');
let srcmaps = require('gulp-sourcemaps');
let nodemon = require('gulp-nodemon');
let del = require('del');

gulp.task('default', ['run']);

/**
 * tslint src dir
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose',
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report());
});

/**
 * clear all dir
 */
gulp.task('clean', () => {
  return del('dist/src/**/*', { force: true });
});

/**
 * compile ts to js with src maps
 */
gulp.task('compile', ['clean'], () => {
  return gulp.src('src/**/*.ts')
    .pipe(srcmaps.init())
    .pipe(ts('tsconfig.json'))
    .js
    .pipe(srcmaps.write('.', {
      includeContent: false,
      sourceRoot: '../'
    }))
    .pipe(gulp.dest('dist/src'));
});

/**
 * run server
 */
gulp.task('run', ['compile'], () => {
  return nodemon({
    script: 'dist/src/server.js',
    watch: ['src/'],
    ext: 'ts json',
    env: { 'NODE_ENV': 'development' },
    tasks: ['compile']
  })
});