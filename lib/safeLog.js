'use strict';

var util;

// use requireActual if in the jest context
if (require.requireActual) {
	util = require.requireActual('util');
}
else {
	util = require('util');
}

module.exports = function safeLog(obj, depth) {
	var options = {
		showHidden: true,
		depth: 0,
		colors: true
	};
	if (depth || depth === 0) {
		options.depth = depth;
	}
	console.log(util.inspect(obj, options));
};
