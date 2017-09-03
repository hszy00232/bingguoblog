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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  /**
   * index action
   * @return {[type]} [description]
   */

  _class.prototype.indexAction = function indexAction() {
    return this.listAction();
  };
  /**
   * post list
   * @return {Promise} []
   */


  _class.prototype.listAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var model, list;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              model = this.model('post');
              _context.next = 3;
              return model.getPostList(this.get('page'), {
                tag: this.get('tag'),
                cate: this.get('cate')
              });

            case 3:
              list = _context.sent;

              this.assign('tag', this.get('tag'));
              this.assign('cate', this.get('cate'));
              this.assign('postList', list);
              return _context.abrupt('return', this.displayView('list'));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listAction() {
      return ref.apply(this, arguments);
    }

    return listAction;
  }();
  /**
   * post detail
   * @return {[type]} [description]
   */


  _class.prototype.detailAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var pathname, detail;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.http.url = decodeURIComponent(this.http.url);
              pathname = this.get('pathname');
              _context2.next = 4;
              return this.model('post').getPostDetail(pathname);

            case 4:
              detail = _context2.sent;

              if (!think.isEmpty(detail)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt('return', this.redirect('/'));

            case 7:
              this.assign(detail);

              return _context2.abrupt('return', this.displayView('detail'));

            case 9:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function detailAction() {
      return ref.apply(this, arguments);
    }

    return detailAction;
  }();

  _class.prototype.pageAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var pathname, detail;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              pathname = this.get('pathname');
              _context3.next = 3;
              return this.model('post').setRelation(false).where({
                pathname: pathname,
                is_public: 1, //公开
                type: 1, //文章
                status: 3 //已经发布
              }).find();

            case 3:
              detail = _context3.sent;

              this.assign('page', detail);
              this.assign('pathname', pathname);

              return _context3.abrupt('return', this.displayView('page'));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function pageAction() {
      return ref.apply(this, arguments);
    }

    return pageAction;
  }();
  /**
   * post archive
   * @return {[type]} [description]
   */


  _class.prototype.archiveAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var model, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              model = this.model('post');
              _context4.next = 3;
              return model.getPostArchive();

            case 3:
              data = _context4.sent;

              this.assign('list', data);
              return _context4.abrupt('return', this.displayView('archive'));

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function archiveAction() {
      return ref.apply(this, arguments);
    }

    return archiveAction;
  }();

  _class.prototype.tagAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      var model, data;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              model = this.model('tag');
              _context5.next = 3;
              return model.getTagArchive();

            case 3:
              data = _context5.sent;

              this.assign('list', data);
              return _context5.abrupt('return', this.displayView('tag'));

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function tagAction() {
      return ref.apply(this, arguments);
    }

    return tagAction;
  }();
  /**
   * search action
   * @return {[type]} [description]
   */


  _class.prototype.searchAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var keyword, postModel, searchResultPromise, tagModel, hotTagsPromise;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              keyword = this.get('keyword').trim();

              if (keyword) {
                postModel = this.model('post');
                searchResultPromise = postModel.getPostSearch(keyword, this.get('page'));

                this.assign('searchData', searchResultPromise);
              }

              //热门标签
              tagModel = this.model('tag');
              hotTagsPromise = tagModel.getHotTags();

              this.assign('hotTags', hotTagsPromise);

              this.assign('keyword', keyword);
              return _context6.abrupt('return', this.displayView('search'));

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function searchAction() {
      return ref.apply(this, arguments);
    }

    return searchAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;