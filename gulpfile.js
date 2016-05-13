var connect		= require('gulp-connect');
var gulp 		= require('gulp');
var del 		= require('del');
var less 		= require('gulp-less');
var useref		= require('gulp-useref');
var ngAnnotate	= require('gulp-ng-annotate');
var uglify		= require('gulp-uglify');
var gulpIf  	= require('gulp-if');
var cssnano 	= require('gulp-cssnano');
//var browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	gulp.watch('src/assets/less/**/*.less', ['compile-less']);
});


gulp.task('hello', function() {
	console.log('Hello!');
});

gulp.task('compile-less', function() {
	return gulp.src('src/assets/less/**/*.less')
		.pipe(less())
		.on('error', swallowError)
		.pipe(gulp.dest('src/assets/css'));	
});

gulp.task('build', ['clean:dist', 'compile-less', 'build-js', 'build-css', 'build-html', 'build-copy', 'htaccess']);

gulp.task('build-js', function() {
	return gulp.src(['src/**/*.js'], {base: 'src'} )
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
	return gulp.src(['src/**/*.css'], {base: 'src'} )
		.pipe(cssnano())
		.pipe(gulp.dest('dist'));
});

gulp.task('build-html', function() {
	return gulp.src(['src/**/*.html'], {base: 'src'} )
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});

gulp.task('build-copy', function() {
	return gulp.src(['src/**/*.{svg,png,jpg,gif,json}'], {base: 'src'} )
		.pipe(gulp.dest('dist'));
});

gulp.task('htaccess', function() {
	return gulp.src('src/.htaccess')
		.pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}