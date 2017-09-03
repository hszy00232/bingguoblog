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

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _speakeasy = require('speakeasy');

var _speakeasy2 = _interopRequireDefault(_speakeasy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * login
   * @return {} []
   */

  _class.prototype.loginAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var model, options, two_factor_auth, verified, username, userModel, userInfo, password;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //二步验证
              model = this.model('options');
              _context.next = 3;
              return model.getOptions();

            case 3:
              options = _context.sent;

              if (!options.two_factor_auth) {
                _context.next = 9;
                break;
              }

              two_factor_auth = this.post('two_factor_auth');
              verified = _speakeasy2.default.totp.verify({
                secret: options.two_factor_auth,
                encoding: 'base32',
                token: two_factor_auth,
                window: 2
              });

              if (verified) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', this.fail('TWO_FACTOR_AUTH_ERROR'));

            case 9:

              //校验帐号和密码
              username = this.post('username');
              userModel = this.model('user');
              _context.next = 13;
              return userModel.where({ name: username }).find();

            case 13:
              userInfo = _context.sent;

              if (!think.isEmpty(userInfo)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt('return', this.fail('ACCOUNT_ERROR'));

            case 16:
              if (!((userInfo.status | 0) !== 1)) {
                _context.next = 18;
                break;
              }

              return _context.abrupt('return', this.fail('ACCOUNT_FORBIDDEN'));

            case 18:

              //校验密码
              password = this.post('password');

              if (userModel.checkPassword(userInfo, password)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt('return', this.fail('ACCOUNT_ERROR'));

            case 21:
              _context.next = 23;
              return this.session('userInfo', userInfo);

            case 23:
              return _context.abrupt('return', this.success());

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loginAction() {
      return ref.apply(this, arguments);
    }

    return loginAction;
  }();
  /**
   * logout
   * @return {} 
   */


  _class.prototype.logoutAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.session('userInfo', '');

            case 2:
              return _context2.abrupt('return', this.redirect('/'));

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function logoutAction() {
      return ref.apply(this, arguments);
    }

    return logoutAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;