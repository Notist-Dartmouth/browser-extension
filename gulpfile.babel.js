import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';
import preprocess from 'gulp-preprocess';

const webpackConfig = require('./webpack.config');

const devConfig = {
  context: {
    ENVIRONMENT: 'development',
    API_HOST: 'localhost:3000',
  },
};

const prodConfig = {
  context: {
    ENVIRONMENT: 'production',
    API_HOST: 'notist.herokuapp.com',
  },
};

gulp.task('clean', cb =>
    rimraf('dist/', cb));

gulp.task('manifest', ['clean'], () =>
  gulp.src('manifest.json').pipe(gulp.dest('./dist')));

gulp.task('styles', ['clean'], () =>
  gulp.src('src/stylesheet.css').pipe(gulp.dest('./dist')));

const build = (config) => {
  gulp.src('src/content.js')
      .pipe(webpack(webpackConfig))
      .pipe(preprocess(config))
      .pipe(gulp.dest('./dist'));
  gulp.src('src/background.js')
      .pipe(webpack(webpackConfig))
      .pipe(preprocess(config))
      .pipe(gulp.dest('dist/'));
};

gulp.task('dev', ['manifest', 'styles'], () => build(devConfig));

gulp.task('prod', ['manifest', 'styles'], () => build(prodConfig));

gulp.task('watch', ['dev'], () => gulp.watch('./src/**/*', ['dev']));
