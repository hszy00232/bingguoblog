'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _speakeasy = require('speakeasy');

var _speakeasy2 = _interopRequireDefault(_speakeasy);

var _phpass = require('phpass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * 获取
   * @return {[type]} [description]
   */

  _class.prototype.getAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var type, model, options, secret, push_sites, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = this.get('type');
              model = this.model('options');
              _context.next = 4;
              return model.getOptions();

            case 4:
              options = _context.sent;

              if (!(type === '2fa')) {
                _context.next = 14;
                break;
              }

              if (!(options.two_factor_auth.length === 32)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', this.success({
                otpauth_url: 'otpauth://totp/firekylin?secret=' + options.two_factor_auth,
                secret: options.two_factor_auth
              }));

            case 10:
              secret = _speakeasy2.default.generateSecret({
                length: 20,
                name: 'firekylin'
              });
              return _context.abrupt('return', this.success({
                otpauth_url: secret.otpauth_url,
                secret: secret.base32
              }));

            case 12:
              _context.next = 20;
              break;

            case 14:
              if (!(type === 'push')) {
                _context.next = 20;
                break;
              }

              _context.next = 17;
              return this.getPushSites();

            case 17:
              push_sites = _context.sent;
              result = this.get('key') ? push_sites[this.get('key')] : (0, _values2.default)(push_sites);
              return _context.abrupt('return', this.success(result));

            case 20:
              return _context.abrupt('return', this.success());

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

  _class.prototype.postAction = function postAction() {
    var type = this.get('type');
    if (type === '2faAuth') {
      var data = this.post();
      var verified = _speakeasy2.default.totp.verify({
        secret: data.secret,
        encoding: 'base32',
        token: data.code,
        window: 2
      });
      return verified ? this.success() : this.fail('TWO_FACTOR_AUTH_ERROR_DETAIL');
    } else if (type === 'push') {
      var _data = this.post();
      return this.setPushSites(_data.appKey, _data);
    }
    return _Base.prototype.postAction.call(this, this);
  };
  /**
   * 更新选项
   * @return {[type]} [description]
   */


  _class.prototype.putAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var type, data, model, result;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              type = this.get('type');
              data = this.post();

              if (!think.isEmpty(data)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', this.fail('DATA_EMPTY'));

            case 4:
              model = this.model('options');

              if (!(type === 'push')) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt('return', this.setPushSites(data.appKey, data, false));

            case 9:
              _context2.next = 11;
              return model.updateOptions(data);

            case 11:
              result = _context2.sent;

              this.success(result);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function putAction() {
      return ref.apply(this, arguments);
    }

    return putAction;
  }();

  _class.prototype.deleteAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var type, key;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              type = this.get('type');

              if (!(type === 'push')) {
                _context3.next = 8;
                break;
              }

              key = this.get('key');

              if (!think.isEmpty(key)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return', this.fail('KEY_EMPTY'));

            case 5:
              return _context3.abrupt('return', this.setPushSites(key, null, false));

            case 8:
              return _context3.abrupt('return', _Base.prototype.deleteAction.call(this));

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteAction() {
      return ref.apply(this, arguments);
    }

    return deleteAction;
  }();

  _class.prototype.getPushSites = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var options;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.model('options').getOptions();

            case 2:
              options = _context4.sent;
              return _context4.abrupt('return', options.push_sites || {});

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getPushSites() {
      return ref.apply(this, arguments);
    }

    return getPushSites;
  }();

  _class.prototype.setPushSites = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(key, data) {
      var only = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      var push_sites, reqInstance, appKey, appSecret, auth_key, checkUrl, _result, result;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.getPushSites();

            case 2:
              push_sites = _context5.sent;

              if (!(only && push_sites.hasOwnProperty(key))) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt('return', this.fail('KEY_EXIST'));

            case 5:
              if (!(data === null)) {
                _context5.next = 9;
                break;
              }

              delete push_sites[key];
              _context5.next = 29;
              break;

            case 9:
              /** 需要增加验证 key 正确性的请求 **/
              reqInstance = think.promisify(_request2.default.get);
              appKey = data.appKey;
              appSecret = data.appSecret;
              auth_key = new _phpass.PasswordHash().hashPassword(appSecret + 'Firekylin');
              checkUrl = data.url + '/admin/post_push?app_key=' + appKey + '&auth_key=' + auth_key;
              _context5.next = 16;
              return reqInstance(checkUrl);

            case 16:
              _result = _context5.sent;
              _context5.prev = 17;

              _result = JSON.parse(_result.body);
              _context5.next = 24;
              break;

            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5['catch'](17);
              return _context5.abrupt('return', this.fail('APP_KEY_SECRET_ERROR'));

            case 24:
              if (_result.errno) {
                _context5.next = 28;
                break;
              }

              push_sites[key] = data;
              _context5.next = 29;
              break;

            case 28:
              return _context5.abrupt('return', this.fail(_result.errmsg));

            case 29:
              _context5.next = 31;
              return this.model('options').updateOptions('push_sites', (0, _stringify2.default)(push_sites));

            case 31:
              result = _context5.sent;
              return _context5.abrupt('return', this.success(result));

            case 33:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[17, 21]]);
    }));

    function setPushSites(_x, _x2, _x3) {
      return ref.apply(this, arguments);
    }

    return setPushSites;
  }();

  return _class;
}(_base2.default);

exports.default = _class;