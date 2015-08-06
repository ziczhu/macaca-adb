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

var co = require('co');
var EOL = require('os').EOL;
var _ = require('./helper');
var exec = require('./exec');
var logger = require('./logger');

function ADB(options) {

}

ADB.prototype.push = function() {

};

ADB.prototype.pull = function() {
};

ADB.prototype.getVersion = function(callback) {
  co(function *(ctx) {
    try {
      var result = yield exec('adb version');
      result = result.match(/\d+.\d+.\d+/)[0];
      callback(null, result);
    } catch(e) {
      callback('get adb version failed');
    }
  })(this);
};

ADB.prototype.getConnectedDevices = function(callback) {
  co(function *(ctx) {
    try {
      var result = yield exec('adb devices');
      result = result.split(EOL);
      result.shift();
      result = result.map(function(device) {
        device = device.split(/\s+/);
        var isVirtual = /\W+/.test(device[0]);

        return {
          // 192.168.56.101:5555
          // emulator-5554
          type: isVirtual ? 'virtual' : 'physical',
          udid: device[0],
          port: !isVirtual ? device[0].match(/\W\d{4}/)[0].slice(1, 5) : 'null'
        }
      });
      callback(null, result);
    } catch(e) {
      logger.warn(e.stack);
      callback('get devices failed');
    }
  })(this);
};

module.exports = ADB;
