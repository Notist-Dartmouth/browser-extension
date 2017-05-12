import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';
import preprocess from 'gulp-preprocess';

const webpackConfig = require('./webpack.config');

const devConfig = {
  context: {
    ENVIRONMENT: 'development',
    API_HOST: 'http://localhost:3000',
    FRONTEND_HOST: 'http://localhost:5000',
  },
};

const prodConfig = {
  context: {
    ENVIRONMENT: 'production',
    API_HOST: 'https://notist.herokuapp.com',
    FRONTEND_HOST: 'http://notist.io',
  },
};

gulp.task('clean', cb =>
    rimraf('dist/', cb));

gulp.task('image', ['clean'], () =>
  gulp.src('./src/images/*').pipe(gulp.dest('./dist')));

gulp.task('manifest', ['clean'], () =>
  gulp.src('manifest.json').pipe(gulp.dest('./dist')));

gulp.task('lib', ['manifest', 'image'], () =>
  gulp.src('./src/lib/**/*.{js,css}')
    .pipe(gulp.dest('dist/lib')));

const build = (config) => {
  gulp.src('src/content.js')
      .pipe(webpack(webpackConfig))
      .pipe(preprocess(config))
      .pipe(gulp.dest('./dist'));
  gulp.src('src/background.js')
      .pipe(webpack(webpackConfig))
      .pipe(preprocess(config))
      .pipe(gulp.dest('./dist'));
  gulp.src('src/lib/scripts/explore.js')
      .pipe(webpack(webpackConfig))
      .pipe(preprocess(config))
      .pipe(gulp.dest('./dist/lib/scripts'));
  gulp.src('src/index.html')
      .pipe(gulp.dest('./dist'));
};

gulp.task('dev', ['lib'], () => build(devConfig));

gulp.task('prod', ['lib'], () => build(prodConfig));

gulp.task('watch', ['dev'], () => gulp.watch('./src/**/*', ['dev']));
