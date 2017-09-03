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

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * get
   * @return {[type]} [description]
   */

  _class.prototype.getAction = function getAction(self) {
    var where = {};
    if (this.id) {
      where.id = this.id;
    } else {
      if (this.get('type') === 'contributor') {
        where = { status: 2, type: 3 };
      } else {
        where = { status: ['!=', 2], type: ['!=', 3], _logic: 'OR' };
      }
    }
    this.modelInstance.field('id,name,display_name,email,type,status,create_time,last_login_time,app_key,app_secret').where(where);
    return _Base.prototype.getAction.call(this, self);
  };
  /**
   * add user
   * @return {[type]} [description]
   */


  _class.prototype.postAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(self) {
      var data, insertId;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.get('type') === 'key')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return this.generateKey(self);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 4:
              data = this.post();
              _context.next = 7;
              return this.modelInstance.addUser(data, this.ip());

            case 7:
              insertId = _context.sent;
              return _context.abrupt('return', this.success({ id: insertId }));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function postAction(_x) {
      return ref.apply(this, arguments);
    }

    return postAction;
  }();

  _class.prototype.generateKey = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(self, status) {
      var isAdmin, app_key, app_secret, user, options, transporter, site_url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              isAdmin = this.userInfo.type === firekylin.USER_ADMIN;
              // let isMine = this.userInfo.id === this.id;

              if (isAdmin) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', this.failed());

            case 3:
              app_key = think.uuid();
              app_secret = think.uuid();
              _context2.next = 7;
              return this.modelInstance.generateKey(this.id, app_key, app_secret, status);

            case 7:
              _context2.next = 9;
              return this.modelInstance.where({ id: this.id }).find();

            case 9:
              user = _context2.sent;
              _context2.next = 12;
              return this.model('options').getOptions();

            case 12:
              options = _context2.sent;
              transporter = _nodemailer2.default.createTransport();
              site_url = options.hasOwnProperty('site_url') ? options.site_url : 'http://' + http.host;

              transporter.sendMail({
                from: 'no-reply@firekylin.org',
                to: user.email,
                subject: '【' + options.title + '】网站推送申请成功',
                text: '你的推送申请审批通过，请将下面的信息添加到自己的博客中完成最后的推送操作。\n        网站名称：' + options.title + '\n        网站地址：' + site_url + '\n        app_key: ' + app_key + '\n        app_secret: ' + app_secret + '\n      '
              });

              if (status != null) {
                this.id = null;
              }
              _context2.next = 19;
              return this.getAction(self);

            case 19:
              return _context2.abrupt('return', _context2.sent);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function generateKey(_x2, _x3) {
      return ref.apply(this, arguments);
    }

    return generateKey;
  }();
  /**
   * update user info
   * @return {[type]} [description]
   */


  _class.prototype.putAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(self) {
      var type, userInfo, _rows, data, rows;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              type = this.get('type');
              //save password

              if (!(type === 'savepwd')) {
                _context3.next = 7;
                break;
              }

              userInfo = this.userInfo;
              _context3.next = 5;
              return this.modelInstance.saveUser({
                password: this.post('password'),
                id: userInfo.id
              }, this.ip());

            case 5:
              _rows = _context3.sent;
              return _context3.abrupt('return', this.success(_rows));

            case 7:
              if (this.id) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt('return', this.fail('PARAMS_ERROR'));

            case 9:
              if (!(type === 'contributor')) {
                _context3.next = 13;
                break;
              }

              _context3.next = 12;
              return this.generateKey(self, 1);

            case 12:
              return _context3.abrupt('return', _context3.sent);

            case 13:
              data = this.post();

              data.id = this.id;
              _context3.next = 17;
              return this.modelInstance.saveUser(data, this.ip());

            case 17:
              rows = _context3.sent;
              return _context3.abrupt('return', this.success({ affectedRows: rows }));

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function putAction(_x4) {
      return ref.apply(this, arguments);
    }

    return putAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;