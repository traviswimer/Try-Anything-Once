var gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	changed = require('gulp-changed'),
	foobar = require('./my_plugin/foobar'), //My plugin
	livereload = require('gulp-livereload');

gulp.task('default', ['minify', 'watch']);

gulp.task('minify', function(){
	return gulp.src('css/*.css')
		.pipe( foobar() )
		.pipe( changed('minified_css') )
		.pipe( minifycss() )
		.pipe( gulp.dest('minified_css') );
});

gulp.task('watch', function(){
	gulp.watch('css/*.css', ['minify']);

	var server = livereload();

	gulp.watch(['minified_css/**']).on('change', function(file) {
		server.changed( file.path );
	});
});

