const browserify = require('browserify');
const gulp = require('gulp');
const vinylBuffer = require('vinyl-buffer');
const vinylSourceStream = require('vinyl-source-stream');

gulp.task('build-js', () => {
    return browserify({
        entries: 'benchmarks/index.browser.js',
        debug: false,
    })
    .bundle()
    .pipe(vinylSourceStream('index.browser.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-html', () => {
    return gulp.src('benchmarks/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', gulp.parallel('build-js', 'build-html'));
