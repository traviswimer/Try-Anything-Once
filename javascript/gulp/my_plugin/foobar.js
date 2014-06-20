// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-foobar';


function gulpFoobar(bar) {

	bar = bar || "bar";

	bar = new Buffer(bar);

	// Creating a stream through which each file will pass
	var stream = through.obj(function(file, enc, callback) {
		if (file.isNull()) {
			 // Do nothing if no contents
		}
		if (file.isBuffer()) {
				file.contents = new Buffer( file.contents.toString().replace(/foo/g, bar) );
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Dont stream, just dont...'));
			return cb();
		}

		this.push(file);
		return callback();

	});

	// returning the file stream
	return stream;
};

// Exporting the plugin main function
module.exports = gulpFoobar;