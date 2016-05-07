var connect = require('gulp-connect');
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

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 80
	});
});

gulp.task('hello', function() {
	console.log('Hello!');
});

gulp.task('less', function() {
	return gulp.src('src/assets/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('assets/css'));	
});

gulp.task('htaccess', function() {
	return gulp.src('src/.htaccess')
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean:dist', 'htaccess'], function() {
	return gulp.src(['src/**/*.{html,svg,png,jpg,gif,css,htaccess}'], {
            base: 'src'
        }).pipe(useref())
		//.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
	var d = del.sync('dist');
	console.log('clean:dist: clean complete');
	return d;
});