var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var path = require("path");


const SASS_INCLUDE_PATHS = [
    path.join(__dirname, '/node_modules/')
];
const NODE_SASS_OPTIONS = {
    includePaths: SASS_INCLUDE_PATHS,
    outputStyle: "expanded",
    precision: 6
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(NODE_SASS_OPTIONS).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('build', ['sass']);
