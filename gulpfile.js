var gulp = require('gulp');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var less = require('gulp-less');
var uglifyCss = require('gulp-uglifycss');

gulp.task('copy-html', function() {
	var htmlResult = gulp.src('app/**/**/*.html')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist'));
});

gulp.task('copy-css', function() {
	gulp.src('app/**/**/*.scss')
		.pipe(changed('dist'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});

gulp.task('global-css', function() {
	gulp.src('assets/css/*.scss')
		.pipe(changed('assets/css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
	gulp.watch('app/**/**/*.html', ['copy-html']);
	gulp.watch('app/**/**/*.scss', ['copy-css']);
	gulp.watch('assets/css/*.scss', ['global-css']);
});

gulp.task('refresh', function() {
	gulp.src('app/**/**/*.html')
		.pipe(gulp.dest('dist'));

	gulp.src('app/**/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});