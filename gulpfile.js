var gulp 	= require('gulp');
var del 	= require('del');
var less 	= require('gulp-less');
var useref	= require('gulp-useref');
var uglify	= require('gulp-uglify');
var gulpIf  = require('gulp-if');
var cssnano = require('gulp-cssnano');
//var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('hello', function() {
	console.log('Hello!');
});

gulp.task('less', function() {
	return gulp.src('assets/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('assets/css'));	
});

gulp.task('useref', function() {
	return gulp.src('*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});