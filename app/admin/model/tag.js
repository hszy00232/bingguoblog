'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * relation model
 */

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * init
   * @param  {} args []
   * @return {}         []
   */

  _class.prototype.init = function init() {
    var _Base$prototype$init;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_Base$prototype$init = _Base.prototype.init).call.apply(_Base$prototype$init, [this].concat(args));

    this.relation = {
      post_tag: {
        type: think.model.HAS_MANY,
        fKey: 'tag_id'
      }
    };
  };

  _class.prototype.addTag = function addTag(data) {
    var where = {
      name: data.name,
      _logic: 'OR'
    };
    if (data.pathname) {
      where.pathname = data.pathname;
    }
    return this.where(where).thenAdd(data);
  };

  _class.prototype.saveTag = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
      var info;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.where({ id: data.id }).find();

            case 2:
              info = _context.sent;

              if (!think.isEmpty(info)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', _promise2.default.reject(new Error('TAG_NOT_EXIST')));

            case 5:
              return _context.abrupt('return', this.where({ id: data.id }).update(data));

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function saveTag(_x) {
      return ref.apply(this, arguments);
    }

    return saveTag;
  }();

  _class.prototype.deleteTag = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(tag_id) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.model('post_tag').where({ tag_id: tag_id }).delete();
              return _context2.abrupt('return', this.where({ id: tag_id }).delete());

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function deleteTag(_x2) {
      return ref.apply(this, arguments);
    }

    return deleteTag;
  }();

  return _class;
}(_base2.default);

exports.default = _class;