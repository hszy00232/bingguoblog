'use strict';
/**
 * model
 */

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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
      cate: {
        type: think.model.MANY_TO_MANY,
        field: 'id,name'
      },
      tag: {
        type: think.model.MANY_TO_MANY,
        field: 'id,name'
      },
      user: {
        type: think.model.BELONG_TO,
        field: 'id,name,display_name'
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  /**
   * relation
   * @type {Object}
   */


  /**
   * get where condition
   * @param  {[type]} where [description]
   * @return {[type]}       [description]
   */

  _class.prototype.getWhereCondition = function getWhereCondition(where) {
    where = think.extend({}, where, {
      is_public: 1, //公开
      type: 0, //文章
      status: 3 //已经发布
    });
    if (!where.create_time) {
      where.create_time = {
        '<=': think.datetime()
      };
    }
    return where;
  };
  /**
   * get post list
   * @param  {[type]} page  [description]
   * @param  {[type]} where [description]
   * @return {[type]}       [description]
   */


  _class.prototype.getPostList = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(page) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var field, _getWhereCondition, name, _ref, id, _where, where;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = options.field || 'id,title,pathname,create_time,summary,comment_num';

              if (!(options.tag || options.cate)) {
                _context.next = 11;
                break;
              }

              name = options.tag ? 'tag' : 'cate';
              _context.next = 5;
              return this.model(name).field('id').setRelation(false).where({ name: options.tag || options.cate }).find();

            case 5:
              _ref = _context.sent;
              id = _ref.id;

              if (!think.isEmpty(id)) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', false);

            case 9:
              _where = this.getWhereCondition((_getWhereCondition = {}, _getWhereCondition[name + '.' + name + '_id'] = id, _getWhereCondition));
              return _context.abrupt('return', this.join({
                table: 'post_' + name,
                as: name,
                on: ['id', 'post_id']
              }).where(_where).order('create_time DESC').countSelect());

            case 11:
              where = this.getWhereCondition(options.where);

              page = page | 0 || 1;
              //only cache first page post
              // if(page === 1){
              //   return think.cache('post_1', () => {
              //     return this.field(field).page(page).setRelation(false).order('create_time DESC').where(where).countSelect();
              //   },{timeout:259200});
              // }

              return _context.abrupt('return', this.field(field).page(page).setRelation(false).order('create_time DESC').where(where).countSelect());

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getPostList(_x, _x2) {
      return ref.apply(this, arguments);
    }

    return getPostList;
  }();

  /**
   * get post detail info
   * @param  {[type]} pathname [description]
   * @return {[type]}          [description]
   */


  _class.prototype.getPostDetail = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(pathname) {
      var where, detail, createTime, prevWhere, prevPromise, nextWhere, nextPromise, _ref2, prev, next;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              where = this.getWhereCondition({ pathname: pathname });
              _context2.next = 3;
              return this.where(where).fieldReverse('markdown_content,summary').find();

            case 3:
              detail = _context2.sent;

              if (!think.isEmpty(detail)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', detail);

            case 6:
              createTime = think.datetime(detail.create_time);
              prevWhere = this.getWhereCondition({
                create_time: ['<', createTime],
                id: ['!=', detail.id]
              });
              prevPromise = this.field('title,pathname').setRelation(false).where(prevWhere).order('create_time DESC').find();
              nextWhere = this.getWhereCondition({
                create_time: ['>', createTime],
                id: ['!=', detail.id]
              });
              nextPromise = this.field('title,pathname').setRelation(false).where(nextWhere).order('create_time ASC').find();
              _context2.next = 13;
              return _promise2.default.all([prevPromise, nextPromise]);

            case 13:
              _ref2 = _context2.sent;
              prev = _ref2[0];
              next = _ref2[1];
              return _context2.abrupt('return', {
                detail: detail,
                prev: prev,
                next: next
              });

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getPostDetail(_x4) {
      return ref.apply(this, arguments);
    }

    return getPostDetail;
  }();

  _class.prototype.getPostRssList = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var field, where, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              field = 'id,title,pathname,content,create_time';
              where = this.getWhereCondition();
              _context3.next = 4;
              return this.field(field).where(where).order('create_time DESC').setRelation(false).limit(10).select();

            case 4:
              data = _context3.sent;
              return _context3.abrupt('return', data);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getPostRssList() {
      return ref.apply(this, arguments);
    }

    return getPostRssList;
  }();

  _class.prototype.getPostSitemapList = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var field, where, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              field = 'pathname,update_time';
              where = this.getWhereCondition();
              _context4.next = 4;
              return this.field(field).where(where).order('update_time DESC').setRelation(false).select();

            case 4:
              data = _context4.sent;
              return _context4.abrupt('return', data);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getPostSitemapList() {
      return ref.apply(this, arguments);
    }

    return getPostSitemapList;
  }();
  /**
   * get post archive
   * @return {[type]} [description]
   */


  _class.prototype.getPostArchive = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var where, data, result;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              where = this.getWhereCondition();
              _context5.next = 3;
              return this.field('id,title,pathname,create_time').order('create_time DESC').setRelation(false).where(where).select();

            case 3:
              data = _context5.sent;
              result = {};

              data.forEach(function (item) {
                var yearMonth = think.datetime(item.create_time, 'YYYY年MM月');
                if (!(yearMonth in result)) {
                  result[yearMonth] = [];
                }
                result[yearMonth].push(item);
              });
              return _context5.abrupt('return', result);

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getPostArchive() {
      return ref.apply(this, arguments);
    }

    return getPostArchive;
  }();
  /**
   * get post search result
   * @param  {[type]} keyword [description]
   * @param  {[type]} page    [description]
   * @return {[type]}         [description]
   */


  _class.prototype.getPostSearch = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(keyword, page) {
      var where;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              where = { 'title|content': ['LIKE', '%' + keyword + '%'] };

              where = this.getWhereCondition(where);
              return _context6.abrupt('return', this.where(where).page(page).setRelation(false).field('title,pathname,summary,create_time').order('create_time DESC').countSelect());

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getPostSearch(_x5, _x6) {
      return ref.apply(this, arguments);
    }

    return getPostSearch;
  }();

  return _class;
}(think.model.relation);

exports.default = _class;