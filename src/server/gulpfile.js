const gulp = require("gulp");
const babel = require("gulp-babel");

const paths = {
  scripts: ['src/**/*.js', '!src/scripts/*']
};

// Build task
gulp.task("build", function () {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

// Watch task
gulp.task("watch", function () {
  gulp.watch(paths.scripts, gulp.series("build"));
});

// Default task: build then watch
gulp.task("default", gulp.series("build", "watch"));

// Separate production task if needed
gulp.task("babel-prod", function () {
  return gulp.src(paths.scripts)
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

