import gulp from 'gulp';
import webpack from 'webpack-stream';
import rimraf from 'rimraf';

gulp.task('manifest', () => {
    return gulp.src('manifest.json').pipe(gulp.dest('./dist'));
});

gulp.task('popup', () => {
    return gulp.src('index.html').pipe(gulp.dest('./dist'));
});

gulp.task('webpack', () => {
    return gulp.src('src/index.jsx')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', (cb) => {
    rimraf('dist/', cb);
});

gulp.task('build', ['clean', 'manifest', 'popup', 'webpack']);

gulp.task('default', ['build']);
