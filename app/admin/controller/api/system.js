'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _base2 = require('./base');

var _base3 = _interopRequireDefault(_base2);

var _package = require('../../../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _base.prototype.init.call(this, http);

    this.modelInstance = this.model('options');
  };

  _class.prototype.getAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var mysql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.modelInstance.query('SELECT VERSION() as version');

            case 2:
              mysql = _context.sent;
              data = {
                nodeVersion: process.versions.node,
                v8Version: process.versions.v8,
                platform: process.platform,
                thinkjsVersion: think.version,
                firekylinVersion: _package2.default.version,
                mysqlVersion: mysql[0].version
              };
              _context.t0 = this;
              _context.t1 = data;
              _context.next = 8;
              return this.getConfig();

            case 8:
              _context.t2 = _context.sent;
              _context.next = 11;
              return this.model('post').count();

            case 11:
              _context.t3 = _context.sent;
              _context.next = 14;
              return this.model('cate').count();

            case 14:
              _context.t4 = _context.sent;
              _context.next = 17;
              return this.model('post').sum('comment_num');

            case 17:
              _context.t5 = _context.sent;
              _context.t6 = {
                posts: _context.t3,
                cates: _context.t4,
                comments: _context.t5
              };
              _context.t7 = {
                versions: _context.t1,
                config: _context.t2,
                count: _context.t6
              };
              return _context.abrupt('return', _context.t0.success.call(_context.t0, _context.t7));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAction() {
      return ref.apply(this, arguments);
    }

    return getAction;
  }();

  _class.prototype.getConfig = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var items, siteConfig;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.modelInstance.select();

            case 2:
              items = _context2.sent;
              siteConfig = {};


              items.forEach(function (item) {
                return siteConfig[item.key] = item.value;
              });

              return _context2.abrupt('return', siteConfig);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getConfig() {
      return ref.apply(this, arguments);
    }

    return getConfig;
  }();

  return _class;
}(_base3.default);

exports.default = _class;