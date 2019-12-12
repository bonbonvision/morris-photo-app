var gulp = require('gulp');

function defaultTask(cb) {
  return gulp.src('src/**')
      .pipe(gulp.dest('public/'));
}

exports.default = defaultTask
