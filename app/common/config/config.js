'use strict';

exports.__esModule = true;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = void 0;
var portFile = think.ROOT_PATH + think.sep + 'port';
if (think.isFile(portFile)) {
  port = _fs2.default.readFileSync(portFile, 'utf8');
}
/**
 * config
 */
exports.default = {
  port: port || 8360,
  resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/
};