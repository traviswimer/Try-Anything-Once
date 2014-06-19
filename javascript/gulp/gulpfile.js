var gulp = require('gulp'),
	minifycss = require('gulp-minify-css')
	changed = require('gulp-changed');

gulp.task('default', ['minify', 'watch']);

gulp.task('minify', function(){
	return gulp.src('css/*.css')
		.pipe( changed('minified_css') )
		.pipe( minifycss() )
		.pipe( gulp.dest('minified_css') );
});

gulp.task('watch', function(){
	gulp.watch('css/*.css', ['minify']);
});