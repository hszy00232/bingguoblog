'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _markedToc = require('marked-toc');

var _markedToc2 = _interopRequireDefault(_markedToc);

var _phpass = require('phpass');

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Base.call.apply(_Base, [this].concat(args))), _this), _this.modelInstance = _this.modelInstance.where({ type: 0 }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  /**
   * get
   * @return {[type]} [description]
   */

  _class.prototype.getAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(self) {
      var data, where, keywords, field;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // this.modelInstance.field('id,user_id,type,status,title,pathname,create_time,update_time');
              data = void 0;

              if (!this.id) {
                _context.next = 10;
                break;
              }

              if (!(this.id === 'lastest')) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', this.lastest());

            case 4:
              _context.next = 6;
              return this.modelInstance.where({ id: this.id }).find();

            case 6:
              data = _context.sent;

              //文章选项
              if (data.options) {
                data.options = JSON.parse(data.options) || {};
              } else {
                data.options = {};
              }
              _context.next = 18;
              break;

            case 10:
              where = {};
              //不是管理员，只显示个人的文章

              if (this.userInfo.type !== 1) {
                where.user_id = this.userInfo.id;
              }

              if (this.get('status')) {
                where.status = this.get('status');
              }

              if (this.get('keyword')) {
                keywords = this.get('keyword').split(/\s+/g);

                if (keywords.indexOf(':public') > -1 || keywords.indexOf(':private') > -1) {
                  where.is_public = Number(keywords.indexOf(':public') > -1);
                  keywords = keywords.filter(function (word) {
                    return word !== ':public' && word !== ':private';
                  });
                }
                if (keywords.length > 0) {
                  where.title = ["like", keywords.map(function (word) {
                    return '%' + word + '%';
                  })];
                }
              }

              field = ['id', 'title', 'user_id', 'create_time', 'update_time', 'status', 'pathname'];
              _context.next = 17;
              return this.modelInstance.where(where).field(field).order('id DESC').page(this.get('page'), 15).countSelect();

            case 17:
              data = _context.sent;

            case 18:
              return _context.abrupt('return', this.success(data));

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAction(_x) {
      return ref.apply(this, arguments);
    }

    return getAction;
  }();

  _class.prototype.getBaseAction = function getBaseAction(self) {
    return _Base.prototype.getAction.call(this, self);
  };
  /**
   * add user
   * @return {[type]} [description]
   */


  _class.prototype.postAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var data, post, insertId;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = this.post();
              //check pathname

              _context2.next = 3;
              return this.modelInstance.where({ pathname: data.pathname }).select();

            case 3:
              post = _context2.sent;

              if (!(post.length > 0)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.fail('PATHNAME_EXIST'));

            case 6:

              /** 如果是编辑发布文章的话默认状态改为审核中 **/
              if (data.status == 3 && this.userInfo.type == 2) {
                data.status = 1;
              }

              /** 推送文章 **/
              this.pushPost(data);

              _context2.next = 10;
              return this.getTagIds(data.tag);

            case 10:
              data.tag = _context2.sent;

              data = this.getContentAndSummary(data);
              data.user_id = this.userInfo.id;
              data = this.getPostTime(data);

              _context2.next = 16;
              return this.modelInstance.addPost(data);

            case 16:
              insertId = _context2.sent;
              return _context2.abrupt('return', this.success({ id: insertId }));

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function postAction() {
      return ref.apply(this, arguments);
    }

    return postAction;
  }();
  /**
   * update user info
   * @return {[type]} [description]
   */


  _class.prototype.putAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var data, rows;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.id) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              data = this.post();
              /** 推送文章 **/

              this.pushPost(data);

              data.id = this.id;
              if (data.markdown_content) {
                data = this.getContentAndSummary(data);
              }
              if (data.create_time) {
                data = this.getPostTime(data);
              }

              if (!data.tag) {
                _context3.next = 11;
                break;
              }

              _context3.next = 10;
              return this.getTagIds(data.tag);

            case 10:
              data.tag = _context3.sent;

            case 11:
              _context3.next = 13;
              return this.modelInstance.savePost(data);

            case 13:
              rows = _context3.sent;
              return _context3.abrupt('return', this.success({ affectedRows: rows }));

            case 15:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function putAction() {
      return ref.apply(this, arguments);
    }

    return putAction;
  }();

  _class.prototype.deleteAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var post;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (this.id) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', this.fail('PARAMS_ERROR'));

            case 2:
              if (!(this.userInfo.type !== 1)) {
                _context4.next = 6;
                break;
              }

              post = this.modelInstance.where({ id: id }).find();

              if (!(post.user_id !== this.userInfo.id)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt('return', this.fail('ACCESS_ERROR'));

            case 6:
              _context4.next = 8;
              return this.modelInstance.deletePost(this.id);

            case 8:
              return _context4.abrupt('return', this.success());

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function deleteAction() {
      return ref.apply(this, arguments);
    }

    return deleteAction;
  }();

  _class.prototype.pushPost = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(post) {
      var push = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(post, _ref) {
          var appKey = _ref.appKey;
          var appSecret = _ref.appSecret;
          var url = _ref.url;
          var auth_key;
          return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  auth_key = passwordHash.hashPassword('' + appSecret + post.markdown_content);

                  (0, _assign2.default)(post, { app_key: appKey, auth_key: auth_key });
                  _request2.default.post({ url: url + '/admin/post_push', form: post });

                case 3:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));
        return function push(_x3, _x4) {
          return ref.apply(this, arguments);
        };
      }();

      var options, push_sites, push_sites_keys, passwordHash, pushes;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(post.status != 3 && data.is_public != 1 && data.push_sites.length == 0)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt('return');

            case 2:

              post = think.extend({}, post);
              post.options = JSON.parse(post.options);

              _context6.next = 6;
              return this.model('options').getOptions();

            case 6:
              options = _context6.sent;
              push_sites = options.push_sites;
              push_sites_keys = post.options.push_sites;
              passwordHash = new _phpass.PasswordHash();


              delete post.cate;
              delete post.options;
              if (!Array.isArray(push_sites_keys)) {
                push_sites_keys = [push_sites_keys];
              }
              pushes = push_sites_keys.map(function (key) {
                return push(post, push_sites[key]);
              });
              _context6.next = 16;
              return _promise2.default.all(pushes);

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function pushPost(_x2) {
      return ref.apply(this, arguments);
    }

    return pushPost;
  }();

  _class.prototype.lastest = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var data;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.modelInstance.getLatest(6);

            case 2:
              data = _context7.sent;
              return _context7.abrupt('return', this.success(data));

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function lastest() {
      return ref.apply(this, arguments);
    }

    return lastest;
  }();

  _class.prototype.getPostTime = function getPostTime(data) {
    data.update_time = think.datetime();
    /**草稿可以没有创建时间**/
    if (!data.create_time) {
      data.create_time = data.status != 0 ? data.update_time : null;
    } else {
      data.create_time = think.datetime(data.create_time);
    }
    return data;
  };

  _class.prototype.getContentAndSummary = function getContentAndSummary(data) {
    data.content = this.markdownToHtml(data.markdown_content);
    data.summary = data.content.split('<!--more-->')[0].replace(/<[>]*>/g, '');
    return data;
  };

  _class.prototype.getTagIds = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(tags) {
      var modelInstance, tagIds, promises;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (tags) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt('return', []);

            case 2:
              if (!think.isArray(tags)) {
                tags = [tags];
              }
              modelInstance = this.model('tag').setRelation(false), tagIds = [];
              promises = tags.map(function (name) {
                return modelInstance.where({ name: name }).thenAdd({ name: name, pathname: encodeURIComponent(name) }).then(function (data) {
                  return tagIds.push({ tag_id: data.id, name: name });
                });
              });
              _context8.next = 7;
              return _promise2.default.all(promises);

            case 7:
              return _context8.abrupt('return', tagIds);

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getTagIds(_x5) {
      return ref.apply(this, arguments);
    }

    return getTagIds;
  }();

  /**
   * generate toc name
   * @param  {String} name []
   * @return {String}      []
   */


  _class.prototype.generateTocName = function generateTocName(name) {
    name = name.trim().replace(/\s+/g, '').replace(/\)/g, '').replace(/[\(\,]/g, '-').toLowerCase();
    if (/^[\w\-]+$/.test(name)) {
      return name;
    }
    return 'toc-' + think.md5(name).slice(0, 3);
  };
  /**
   * markdown to html
   * @return {} []
   */


  _class.prototype.markdownToHtml = function markdownToHtml(content) {
    var _this2 = this;

    var tocContent = (0, _marked2.default)((0, _markedToc2.default)(content)).replace(/<a\s+href="#([^\"]+)">([^<>]+)<\/a>/g, function (a, b, c) {
      return '<a href="#' + _this2.generateTocName(c) + '">' + c + '</a>';
    });

    var markedContent = (0, _marked2.default)(content).replace(/<h(\d)[^<>]*>(.*?)<\/h\1>/g, function (a, b, c) {
      if (b == 2) {
        return '<h' + b + ' id="' + _this2.generateTocName(c) + '">' + c + '</h' + b + '>';
      }
      return '<h' + b + ' id="' + _this2.generateTocName(c) + '"><a class="anchor" href="#' + _this2.generateTocName(c) + '"></a>' + c + '</h' + b + '>';
    });
    // markedContent = markedContent.replace(/<h(\d)[^<>]*>([^<>]+)<\/h\1>/, (a, b, c) => {
    //   return `${a}<div class="toc">${tocContent}</div>`;
    // });

    var highlightContent = markedContent.replace(/<pre><code\s*(?:class="lang-(\w+)")?>([\s\S]+?)<\/code><\/pre>/mg, function (a, language, text) {
      text = text.replace(/&#39;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/\&quot;/g, '"').replace(/\&amp;/g, "&");
      var result = _highlight2.default.highlightAuto(text, language ? [language] : undefined);
      return '<pre><code class="hljs lang-' + result.language + '">' + result.value + '</code></pre>';
    });

    return highlightContent;
  };

  return _class;
}(_base2.default);

exports.default = _class;