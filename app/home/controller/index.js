'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index
   * @return {[type]} [description]
   */

  _class.prototype.indexAction = function indexAction() {
    return this.action('post', 'list');
  };
  /**
   * rss
   * @return {[type]} [description]
   */


  _class.prototype.rssAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var model, list;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              model = this.model('post');
              _context.next = 3;
              return model.getPostRssList();

            case 3:
              list = _context.sent;

              this.assign('list', list);
              this.assign('currentTime', new Date().toString());

              this.type('text/xml');
              return _context.abrupt('return', _Base.prototype.display.call(this, this.HOME_VIEW_PATH + 'rss.xml'));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function rssAction() {
      return ref.apply(this, arguments);
    }

    return rssAction;
  }();

  /**
   * sitemap action
   * @return {[type]} [description]
   */


  _class.prototype.sitemapAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var model, list;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              model = this.model('post');
              list = model.getPostSitemapList();

              this.assign('list', list);

              this.type('text/xml');
              return _context2.abrupt('return', this.display(this.HOME_VIEW_PATH + 'sitemap.xml'));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function sitemapAction() {
      return ref.apply(this, arguments);
    }

    return sitemapAction;
  }();
  /**
   * install
   * @return {[type]} [description]
   */


  _class.prototype.installAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var errors, data, dbInfo, account, InstallService, instance, message;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!this.isGet()) {
                _context3.next = 4;
                break;
              }

              if (!firekylin.isInstalled) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt('return', this.redirect('/'));

            case 3:
              return _context3.abrupt('return', this.display());

            case 4:
              if (!firekylin.isInstalled) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', this.fail('SYSTERM_INSTALLED'));

            case 6:
              errors = this.assign('errors');

              if (think.isEmpty(errors)) {
                _context3.next = 10;
                break;
              }

              this.assign('message', errors[(0, _keys2.default)(errors)[0]]);
              return _context3.abrupt('return', this.display());

            case 10:
              data = this.post();
              dbInfo = {
                host: data.db_host,
                port: data.db_port,
                database: data.db_name,
                user: data.db_account,
                password: data.db_password,
                prefix: data.db_table_prefix
              };
              account = {
                username: data.username,
                password: data.password
              };
              InstallService = this.service('install');
              instance = new InstallService(dbInfo, account, this.ip());
              message = 'success';
              _context3.next = 18;
              return instance.run().catch(function (err) {
                message = err;
              });

            case 18:
              this.assign('message', message);
              this.assign('data', data);
              this.display();

            case 21:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function installAction() {
      return ref.apply(this, arguments);
    }

    return installAction;
  }();
  /**
   * 申请成为投稿者
   * @return {[type]} [description]
   */


  _class.prototype.contributorAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var user;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!this.options.hasOwnProperty('push') || this.options.push == 0)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.fail('推送申请功能未开启'));

            case 2:
              if (!this.isGet()) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt('return', this.display());

            case 4:
              user = this.post();

              user.type = firekylin.USER_CONTRIBUTOR;
              user.status = firekylin.USER_DISABLED;
              user.create_time = think.datetime();
              user.last_login_time = user.create_time;
              user.create_ip = this.ip();
              user.last_login_ip = this.ip();

              _context4.next = 13;
              return this.model('user').where({ name: user.name, email: user.email, _logic: 'OR' }).thenAdd(user);

            case 13:
              this.assign('message', 'success');
              this.display();

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function contributorAction() {
      return ref.apply(this, arguments);
    }

    return contributorAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;