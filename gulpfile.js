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


gulp.task('connect', function() {
  connect.server({
    name: 'M Localhost',
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
 
gulp.task('default', ['connect']);

gulp.task('watch', function() {
	gulp.watch('src/assets/less/**/*.less', ['compile-less', 'build-app']);
});

gulp.task('build', ['clean:dist', 'compile-less', 'build-js', 'build-app', 'build-copy', 'htaccess']);

/**
 * Compiles less into css and places into /src/assets/css
 * This doesnt move css files to /dist as /index.html needs to be built
 * with useref --> https://www.npmjs.com/package/useref
 */
gulp.task('compile-less', function() {
	return gulp.src('src/assets/less/**/*.less')
		.pipe(less())
		.on('error', swallowError)
		.pipe(gulp.dest('src/assets/css'));	
});

/**
 * Builds the app and places in /Sdist
 */
gulp.task('build-app', function() {
	return gulp.src(['src/**/*.html'], {base: 'src'} )
		.pipe(useref())
		.pipe(gulpif('*.js', ngAnnotate()))
    	.pipe(gulpif('*.js', uglify({ 
    		mangle: false
		})))
    	.pipe(gulpif('*.html', strip({ safe: true })))
		.pipe(gulp.dest('dist'));
});

gulp.task('build-copy', function() {
	return gulp.src(['src/**/*.{svg,png,jpg,gif,json}'], {base: 'src'} )
		.pipe(gulp.dest('dist'));
});

/**
 * 
 */
gulp.task('build-js', function() {
	return gulp.src(['src/app/components/metronome/metronomeWorker.js'], {base: 'src'} )
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

/**
 * Copy the .htaccess file to ./dist
 */
gulp.task('htaccess', function() {
	return gulp.src('src/.htaccess')
		.pipe(gulp.dest('dist'));
});

/**
 * Delete ./dist folder and all contents
 */
gulp.task('clean:dist', function() {
	return del.sync('dist');
});

/**
 * Print error to screen, then continue functioning as normal
 * @param {*} error 
 */
function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}



