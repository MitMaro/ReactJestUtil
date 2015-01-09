'use strict';

var ReactTools = require('react-tools');
module.exports = {
  process: function(src, path) {
    try {
      return ReactTools.transform(src, {harmony: true});
    }
    catch(e) {
      throw new Error('The source file, ' + path + ', produced the error: \n' + e.message);
    }
  }
};
