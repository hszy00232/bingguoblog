'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$service$base) {
  (0, _inherits3.default)(_class, _think$service$base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _think$service$base.apply(this, arguments));
  }

  /**
   * init
   * @return {}         []
   */

  _class.prototype.init = function init() {
    var _think$service$base$p;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (_think$service$base$p = _think$service$base.prototype.init).call.apply(_think$service$base$p, [this].concat(args));
  };
  /**
   * sync post comments
   * @return {[type]} [description]
   */


  _class.prototype.sync = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var optionsModel, options, comment;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optionsModel = this.model('options');
              _context.next = 3;
              return optionsModel.getOptions();

            case 3:
              options = _context.sent;
              comment = options.comment;

              if (!comment.name) {
                _context.next = 12;
                break;
              }

              if (!(comment.type === 'disqus')) {
                _context.next = 10;
                break;
              }

              return _context.abrupt('return', this.syncFromDisqus(comment));

            case 10:
              if (!(comment.type === 'duoshuo')) {
                _context.next = 12;
                break;
              }

              return _context.abrupt('return', this.syncFromDuoshuo(comment));

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function sync() {
      return ref.apply(this, arguments);
    }

    return sync;
  }();
  /**
   * get post data
   * @return {[type]} [description]
   */


  _class.prototype.getPostData = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var postModel, allPost, keys;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              postModel = this.model('post');
              _context2.next = 3;
              return postModel.setRelation(false).order('create_time DESC').field('id,pathname,comment_num').select();

            case 3:
              allPost = _context2.sent;
              keys = {};

              allPost.map(function (item) {
                var key = think.md5(item.pathname);
                keys[key] = { id: item.id, comment_num: item.comment_num };
                return key;
              });
              return _context2.abrupt('return', keys);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getPostData() {
      return ref.apply(this, arguments);
    }

    return getPostData;
  }();
  /**
   * sync from disqus
   * @return {[type]} [description]
   */


  _class.prototype.syncFromDisqus = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(comment) {
      var _this2 = this;

      var postData, threads, index, ths, url, fn, response, data, promises;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getPostData();

            case 2:
              postData = _context3.sent;

              if (!think.isEmpty(postData)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return');

            case 5:
              threads = (0, _keys2.default)(postData); //.join('&l=')

              index = 0;

            case 7:
              if (!true) {
                _context3.next = 31;
                break;
              }

              ths = threads.slice(index, index + 10);

              index += 10;

              if (ths.length) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt('return');

            case 12:
              url = 'https://' + comment.name + '.disqus.com/count-data.js?1=' + ths.join('&l=');
              //think.log(`sync comments ${url}`);

              fn = think.promisify(_request2.default, _request2.default);
              _context3.next = 16;
              return fn(url).catch(function () {});

            case 16:
              response = _context3.sent;

              if (response) {
                _context3.next = 19;
                break;
              }

              return _context3.abrupt('continue', 7);

            case 19:
              data = response.body.match(/DISQUSWIDGETS.displayCount\(([^\(\)]+)\);/);

              if (data) {
                _context3.next = 22;
                break;
              }

              return _context3.abrupt('continue', 7);

            case 22:

              data = JSON.parse(data[1]).counts;
              promises = data.map(function (item) {
                if (item.comments === postData[item.id].comment_num) {
                  return;
                }
                var id = postData[item.id].id;
                return _this2.model('post').where({ id: id }).update({ comment_num: item.comments });
              });
              _context3.next = 26;
              return _promise2.default.all(promises);

            case 26:
              if (!promises.length) {
                _context3.next = 29;
                break;
              }

              _context3.next = 29;
              return this.clearPostCache();

            case 29:
              _context3.next = 7;
              break;

            case 31:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function syncFromDisqus(_x) {
      return ref.apply(this, arguments);
    }

    return syncFromDisqus;
  }();
  /**
   * sync from duoshuo
   * @return {[type]} [description]
   */


  _class.prototype.syncFromDuoshuo = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(comment) {
      var postData, threads, index, ths, url, fn, response, data, promises, key, id, promise;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getPostData();

            case 2:
              postData = _context4.sent;

              if (!think.isEmpty(postData)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt('return');

            case 5:
              threads = (0, _keys2.default)(postData);
              index = 0;

            case 7:
              if (!true) {
                _context4.next = 36;
                break;
              }

              ths = threads.slice(index, index + 10);

              index += 10;

              if (ths.length) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt('return');

            case 12:
              url = 'http://api.duoshuo.com/threads/counts.json?short_name=' + comment.name + '&threads=' + ths.join(',');
              //think.log(`sync comments ${url}`);

              fn = think.promisify(_request2.default, _request2.default);
              _context4.next = 16;
              return fn(url);

            case 16:
              response = _context4.sent;
              data = JSON.parse(response.body).response;
              promises = [];
              _context4.t0 = _regenerator2.default.keys(data);

            case 20:
              if ((_context4.t1 = _context4.t0()).done) {
                _context4.next = 29;
                break;
              }

              key = _context4.t1.value;

              if (!(data[key].comments === postData[key].comment_num)) {
                _context4.next = 24;
                break;
              }

              return _context4.abrupt('continue', 20);

            case 24:
              id = postData[key].id;
              promise = this.model('post').where({ id: id }).update({ comment_num: data[key].comments });

              promises.push(promise);
              _context4.next = 20;
              break;

            case 29:
              _context4.next = 31;
              return _promise2.default.all(promises);

            case 31:
              if (!promises.length) {
                _context4.next = 34;
                break;
              }

              _context4.next = 34;
              return this.clearPostCache();

            case 34:
              _context4.next = 7;
              break;

            case 36:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function syncFromDuoshuo(_x2) {
      return ref.apply(this, arguments);
    }

    return syncFromDuoshuo;
  }();

  _class.prototype.clearPostCache = function clearPostCache() {
    console.log('clear post cache');
    return think.cache('post_1', null);
  };

  return _class;
}(think.service.base);

exports.default = _class;