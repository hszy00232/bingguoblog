'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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
      tag: think.model.MANY_TO_MANY,
      cate: think.model.MANY_TO_MANY,
      user: {
        type: think.model.BELONG_TO,
        // fKey: 'user_id',
        // key: 'display_name',
        field: 'id,name,display_name'
      }
    };
  };

  /**
   * 添加文章
   * @param {[type]} data [description]
   * @param {[type]} ip   [description]
   */


  _class.prototype.addPost = function addPost(data) {
    var create_time = think.datetime();
    data = (0, _assign2.default)({
      type: 0,
      status: 0,
      create_time: create_time,
      update_time: create_time,
      is_public: 1
    }, data);

    return this.where({ pathname: data.pathname, _logic: 'OR' }).thenAdd(data);
  };

  _class.prototype.savePost = function () {
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

              return _context.abrupt('return', _promise2.default.reject(new Error('POST_NOT_EXIST')));

            case 5:
              data.update_time = think.datetime();
              return _context.abrupt('return', this.where({ id: data.id }).update(data));

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function savePost(_x) {
      return ref.apply(this, arguments);
    }

    return savePost;
  }();

  _class.prototype.deletePost = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(post_id) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.model('post_cate').delete({ post_id: post_id });

            case 2:
              _context2.next = 4;
              return this.model('post_tag').delete({ post_id: post_id });

            case 4:
              return _context2.abrupt('return', this.where({ id: post_id }).delete());

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function deletePost(_x2) {
      return ref.apply(this, arguments);
    }

    return deletePost;
  }();

  /**
   * get count posts
   * @param  {Number} userId []
   * @return {Promise}        []
   */


  _class.prototype.getCount = function getCount(userId) {
    if (userId) {
      return this.where({ user_id: userId }).count();
    }
    return this.count();
  };
  /**
   * get latest posts
   * @param  {Number} nums []
   * @return {}      []
   */


  _class.prototype.getLatest = function getLatest() {
    var nums = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

    return this.order('id DESC').where({
      create_time: { '<=': think.datetime() },
      is_public: 1, //公开
      type: 0, //文章
      status: 3 //已经发布
    }).limit(nums).setRelation(false).order('create_time DESC').select();
  };

  _class.prototype.afterUpdate = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data, options) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _Base.prototype.afterUpdate.call(this, data, options);

            case 2:
              return _context3.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function afterUpdate(_x4, _x5) {
      return ref.apply(this, arguments);
    }

    return afterUpdate;
  }();

  _class.prototype.afterDelete = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data, options) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _Base.prototype.afterDelete.call(this, data, options);

            case 2:
              return _context4.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function afterDelete(_x6, _x7) {
      return ref.apply(this, arguments);
    }

    return afterDelete;
  }();

  _class.prototype.afterAdd = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(data, options) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _Base.prototype.afterAdd.call(this, data, options);

            case 2:
              return _context5.abrupt('return', this.clearCache());

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function afterAdd(_x8, _x9) {
      return ref.apply(this, arguments);
    }

    return afterAdd;
  }();

  _class.prototype.clearCache = function clearCache() {
    think.log('clear cache');
    return think.cache('post_1', null);
  };

  return _class;
}(_base2.default);

exports.default = _class;