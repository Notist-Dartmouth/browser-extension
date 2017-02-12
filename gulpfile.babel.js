import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';

gulp.task('manifest', () => {
    return gulp.src('manifest.json').pipe(gulp.dest('./dist'));
});

gulp.task('popup', () => {
    return gulp.src('index.html').pipe(gulp.dest('./dist'));
});

gulp.task('content-script', () => {
  return gulp.src('src/content.js')
      .pipe(webpack(require('./webpack.config')))
      .pipe(gulp.dest('./dist'));
});

gulp.task('background-webpack', () => {
  return gulp.src('src/background.js')
      .pipe(webpack(require('./webpack.config')))
      .pipe(gulp.dest('dist/'));
});

gulp.task('popup-webpack', () => {
    return gulp.src('src/index.jsx')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', (cb) => {
    rimraf('dist/', cb);
});

gulp.task('build', ['clean', 'manifest', 'popup', 'popup-webpack', 'background-webpack', 'content-script']);

gulp.task('default', ['build']);
