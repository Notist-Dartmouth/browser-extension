import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';

const webpackConfig = require('./webpack.config');

gulp.task('manifest', () =>
  gulp.src('manifest.json').pipe(gulp.dest('./dist')));

gulp.task('content-script', () =>
  gulp.src('src/content.js')
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('./dist')));

gulp.task('background-webpack', () =>
  gulp.src('src/background.js')
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('dist/')));

gulp.task('clean', cb =>
    rimraf('dist/', cb));

gulp.task('build', ['clean', 'manifest', 'background-webpack', 'content-script']);

gulp.task('default', ['build']);

gulp.task('watch', ['default'], () =>
  gulp.watch('./src/**/*'));
