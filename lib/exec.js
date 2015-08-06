/* ================================================================
 * macaca-adb by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Aug 06 2015 14:48:08 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var exec = require('child_process').exec;
var _ = require('./helper');

module.exports = function(cmd, opts) {
  return function(done) {
    exec(cmd, opts, function(err, stdout) {
      done(err, _.trim(stdout));
    });
  };
};
