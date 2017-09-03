'use strict';
/**
 * model
 */

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$relation) {
  (0, _inherits3.default)(_class, _think$model$relation);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _think$model$relation.call.apply(_think$model$relation, [this].concat(args))), _this), _this.relation = {
      post_tag: {
        type: think.model.HAS_MANY,
        field: 'tag_id'
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * get hot tags
   * @return {} []
   */

  _class.prototype.getHotTags = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getTagArchive();

            case 2:
              data = _context.sent;
              return _context.abrupt('return', data.slice(0, 5));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getHotTags() {
      return ref.apply(this, arguments);
    }

    return getHotTags;
  }();

  _class.prototype.getTagArchive = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.select();

            case 2:
              data = _context2.sent;

              data = data.map(function (item) {
                item.count = item.post_tag.length;
                return item;
              }).sort(function (a, b) {
                return a.count > b.count ? -1 : 1;
              });
              return _context2.abrupt('return', data);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getTagArchive() {
      return ref.apply(this, arguments);
    }

    return getTagArchive;
  }();

  return _class;
}(think.model.relation);

exports.default = _class;