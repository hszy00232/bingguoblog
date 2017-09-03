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

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Post) {
  (0, _inherits3.default)(_class, _Post);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Post.call.apply(_Post, [this].concat(args))), _this), _this.modelInstance = _this.modelInstance.setRelation('user').where({ type: 1 }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  _class.prototype.getAction = function getAction(self) {
    this.modelInstance.order('id DESC').page(this.get('page'), 20);
    return _Post.prototype.getBaseAction.call(this, self);
  };

  _class.prototype.postAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var data, post, insertId;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = this.post();

              //check pathname

              _context.next = 3;
              return this.modelInstance.where({ pathname: data.pathname }).select();

            case 3:
              post = _context.sent;

              if (!(post.length > 0)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', this.fail('PATHNAME_EXIST'));

            case 6:

              data.user_id = this.userInfo.id;
              data = this.getContentAndSummary(data);
              data = this.getPostTime(data);
              data.type = 1;

              _context.next = 12;
              return this.modelInstance.addPost(data);

            case 12:
              insertId = _context.sent;
              return _context.abrupt('return', this.success({ id: insertId }));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function postAction() {
      return ref.apply(this, arguments);
    }

    return postAction;
  }();

  _class.prototype.putAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data, rows;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.id) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              data = this.post();

              data.id = this.id;
              data.type = 1;
              data = this.getContentAndSummary(data);
              data = this.getPostTime(data);

              _context2.next = 9;
              return this.modelInstance.savePost(data);

            case 9:
              rows = _context2.sent;
              return _context2.abrupt('return', this.success({ affectedRows: rows }));

            case 11:
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

  return _class;
}(_post2.default);

exports.default = _class;