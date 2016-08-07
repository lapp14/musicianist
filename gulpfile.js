var gulp 		= require('gulp');
var connect		= require('gulp-connect');
var cssnano 	= require('gulp-cssnano');
var gulpif  	= require('gulp-if');
var less 		= require('gulp-less');
var ngAnnotate	= require('gulp-ng-annotate');
var strip		= require('gulp-strip-comments');
var uglify		= require('gulp-uglify');
var useref		= require('gulp-useref');
var del 		= require('del');


gulp.task('watch', function() {
	gulp.watch('src/assets/less/**/*.less', ['compile-less']);
});

gulp.task('build', ['clean:dist', 'compile-less', 'build-js', /*'build-css',*/ 'build-app', 'build-copy', 'htaccess']);

gulp.task('compile-less', function() {
	return gulp.src('src/assets/less/**/*.less')
		.pipe(less())
		.on('error', swallowError)
		.pipe(gulp.dest('src/assets/css'));	
});

gulp.task('build-app', function() {
	return gulp.src(['src/**/*.html'], {base: 'src'} )
		.pipe(useref())
		.pipe(gulpif('*.js', ngAnnotate()))
    	.pipe(gulpif('*.js', uglify({ mangle: false })))
    	.pipe(gulpif('*.html', strip({ safe: true })))
		.pipe(gulp.dest('dist'));
});

gulp.task('build-copy', function() {
	return gulp.src(['src/**/*.{svg,png,jpg,gif,json}'], {base: 'src'} )
		.pipe(gulp.dest('dist'));
});

gulp.task('build-js', function() {
	return gulp.src(['src/app/components/metronome/metronomeWorker.js'], {base: 'src'} )
		.pipe(ngAnnotate())
		.pipe(uglify())
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







gulp.task('build-css', function() {
	return gulp.src(['src/**/*.css'], {base: 'src'} )
		.pipe(cssnano())
		.pipe(gulp.dest('dist'));
});

