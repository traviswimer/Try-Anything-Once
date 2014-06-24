var Promise = require("bluebird");

var fs = require("fs");
Promise.promisifyAll( fs );

// simple chaining/thens/catch
fs.readFileAsync("test.txt", "utf8").then(function(val){
	console.log(val);
	return val + " and stuff";
}).then(function(val){
	console.log(val);
	throw new Error("this is an error");
	return "This should not be logged";
}).then(function(val){
	console.log(val);
}).catch(function(err){
	console.log(err);
});

// Errors
fs.readFileAsync("nonexistentFile.txt", "utf8").then(function(val){
	console.log("No error");
}).catch(SyntaxError, function(err){
	console.log("not a syntax error, so this shouldn't log");
}).error(function(err){
	console.log("ERROR:");
	console.log(err.message);
}).finally(function(){
	console.log("this is always logged");
});

// Resolves
var spreadPromise = new Promise(function( resolve, reject ){
	setTimeout(resolve, 200, ["thing1", "thing2", "thing3"]);
}).spread(function( t1, t2, t3 ){
	console.log(t2);
});

// Rejects
var spreadPromise = new Promise(function( resolve, reject ){
	setTimeout(reject, 300, Error("REJECTED"));
	return "resolved";
}).then(function(val){
	console.log(val);
}).error(function(err){
	console.log(err.message);
});



// THIS is messy
function MessyClass(path){
	this.path = path;
}
MessyClass.prototype.fetchFile = function(theThis){
	var self = theThis || this;
	return fs.readFileAsync(this.path).bind(self).then(function(val){
		if(typeof this.path !== "undefined"){
			console.log("the binding worked");
		}else{
			console.log("Binding failed");
		}
	});
}
var mc = new MessyClass("test.txt");
var fakeThis = {};
mc.fetchFile();
mc.fetchFile(fakeThis);


