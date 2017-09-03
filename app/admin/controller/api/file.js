'use strict';

exports.__esModule = true;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2js = require('xml2js');

var _xml2js2 = _interopRequireDefault(_xml2js);

var _toMarkdown = require('to-markdown');

var _toMarkdown2 = _interopRequireDefault(_toMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  _class.prototype.postAction = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var file, contentType, basename, destDir, destPath, result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.post('fileUrl')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', this.getFileByUrl(this.post('fileUrl')));

            case 2:
              if (!(this.post('importor') === 'wordpress')) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', this.importFromWP());

            case 4:
              file = this.file('file');

              if (file) {
                _context.next = 9;
                break;
              }

              if (!this.post('fileUrl')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', this.getFileByUrl(this.post('fileUrl')));

            case 8:
              return _context.abrupt('return', this.fail('FILE_UPLOAD_ERROR'));

            case 9:
              contentType = file.headers['content-type']; //check content-type if you want;

              basename = this.post('name') ? this.post('name') + _path2.default.extname(file.path) : _path2.default.basename(file.path);
              destDir = (0, _moment2.default)(new Date()).format('YYYYMM');
              destPath = _path2.default.join(think.UPLOAD_PATH, destDir);

              if (!think.isDir(destPath)) {
                think.mkdir(destPath);
              }

              _context.next = 16;
              return think.promisify(_fs2.default.rename, _fs2.default)(file.path, _path2.default.join(destPath, basename));

            case 16:
              result = _context.sent;

              if (result) {
                this.fail('FILE_UPLOAD_MOVE_ERROR');
              }
              return _context.abrupt('return', this.success(_path2.default.join('/static/upload', destDir, basename)));

            case 19:
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

  _class.prototype.getFileByUrl = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url) {
      var _this2 = this;

      var fn, result, writeFile, destDir, basename, destPath;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fn = think.promisify(_request2.default.get);
              _context2.next = 3;
              return fn({
                url: url,
                headers: {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) Chrome/47.0.2526.111 Safari/537.36"
                },
                strictSSL: false,
                timeout: 1000,
                encoding: 'binary'
              }).catch(function () {
                return _this2.fail("URL参数不合法或者请求失败！");
              });

            case 3:
              result = _context2.sent;

              if (!(result.headers["content-type"].indexOf('image') === -1)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt('return', this.fail("请求的资源不是一张图片"));

            case 6:
              ;

              writeFile = think.promisify(_fs2.default.writeFile, _fs2.default);
              destDir = (0, _moment2.default)(new Date()).format('YYYYMM');
              basename = (this.post('name') ? this.post('name') : think.md5(result.body)) + _path2.default.extname(url);
              destPath = _path2.default.join(think.UPLOAD_PATH, destDir);

              if (!think.isDir(destPath)) {
                think.mkdir(destPath);
              }
              _context2.next = 14;
              return writeFile(_path2.default.join(destPath, basename), result.body, 'binary');

            case 14:
              result = _context2.sent;
              return _context2.abrupt('return', this.success(_path2.default.join('/static/upload', destDir, basename)));

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getFileByUrl(_x) {
      return ref.apply(this, arguments);
    }

    return getFileByUrl;
  }();

  _class.prototype.importFromWP = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var _this3 = this;

      var file, readFile, parser, parseString, wxrXML, wxrJSON, channel, categories, cateModelInstance, categoriesPromise, tags, tagModelInstance, tagsPromise, postStatus, posts, postModelInstance, postsPromise, pages, pageModelInstance, pagesPromise;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              file = this.file('file');

              if (file) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt('return', this.fail('FILE_UPLOAD_ERROR'));

            case 3:
              readFile = think.promisify(_fs2.default.readFile, _fs2.default);
              parser = new _xml2js2.default.Parser();
              parseString = think.promisify(parser.parseString, parser);
              _context6.next = 8;
              return readFile(file.path);

            case 8:
              wxrXML = _context6.sent;
              _context6.next = 11;
              return parseString(wxrXML);

            case 11:
              wxrJSON = _context6.sent;

              wxrJSON = this.formatArray(wxrJSON);
              channel = wxrJSON.rss.channel;
              // 导入用户

              if (!channel.hasOwnProperty('wp:author')) {
                _context6.next = 16;
                break;
              }

              return _context6.delegateYield(_regenerator2.default.mark(function _callee3() {
                var authors, userModelInstance, authorsPromise;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        authors = channel['wp:author'], userModelInstance = _this3.model('user');
                        authorsPromise = authors.map(function (author) {
                          return userModelInstance.addUser({
                            username: author['wp:author_login'][0],
                            email: author['wp:author_email'][0],
                            display_name: author['wp:author_display_name'][0],
                            password: 'admin12345678',
                            type: 2, //默认导入用户都为编辑
                            status: 2 }, //默认导入用户都处于禁用状态
                          '127.0.0.1');
                        });
                        _context3.next = 4;
                        return _promise2.default.all(authorsPromise);

                      case 4:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this3);
              })(), 't0', 16);

            case 16:

              //导入分类
              //为了简单不支持子分类导入，默认所有分类为一级分类
              categories = channel['wp:category'], cateModelInstance = this.model('cate');

              if (!categories) {
                _context6.next = 21;
                break;
              }

              categoriesPromise = categories.map(function (cate) {
                return cateModelInstance.addCate({
                  name: cate['wp:cat_name'][0],
                  pathname: decodeURIComponent(cate['wp:category_nicename'][0]),
                  pid: 0
                });
              });
              _context6.next = 21;
              return _promise2.default.all(categoriesPromise);

            case 21:

              // 导入标签
              tags = channel['wp:tag'], tagModelInstance = this.model('tag');

              if (!tags) {
                _context6.next = 26;
                break;
              }

              tagsPromise = tags.map(function (tag) {
                return tagModelInstance.addTag({
                  name: tag['wp:tag_name'][0],
                  pathname: decodeURIComponent(tag['wp:tag_slug'][0])
                });
              });
              _context6.next = 26;
              return _promise2.default.all(tagsPromise);

            case 26:

              //导入文章
              postStatus = {
                publish: 3, //发布
                future: 3, //未来发布
                draft: 0, //草稿
                pending: 1, //待审核
                private: 3, //私密文章对应 is_public 字段为 false, 发布状态为已发布
                trash: 2 };
              //删除文章没有对应关系遂转为已拒绝文章
              posts = channel.item.filter(function (item) {
                return item['wp:post_type'][0] === 'post';
              });
              postModelInstance = this.model('post');
              postsPromise = posts.map(function () {
                var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(item) {
                  var user, cate, cates, summary, post;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.prev = 0;
                          _context4.next = 3;
                          return _this3.model('user').where({ name: item['dc:creator'][0] }).find();

                        case 3:
                          user = _context4.sent;

                          //查询分类 ID
                          cate = [];

                          if (!item.hasOwnProperty('category')) {
                            _context4.next = 12;
                            break;
                          }

                          cates = item.category.filter(function (item) {
                            return item.$.domain === 'category';
                          }).map(function (item) {
                            return item._;
                          });

                          if (!(Array.isArray(cates) && cates.length > 0)) {
                            _context4.next = 12;
                            break;
                          }

                          _context4.next = 10;
                          return _this3.model('cate').setRelation(false).field('id').where({ name: ['IN', cates] }).select();

                        case 10:
                          cate = _context4.sent;

                          cate = cate.map(function (item) {
                            return item.id;
                          });

                        case 12:
                          //摘要有可能是空
                          summary = void 0;

                          if (item.hasOwnProperty('excerpt:encoded') && item['excerpt:encoded'][0] !== '') {
                            summary = item['excerpt:encoded'][0];
                          } else {
                            summary = item['content:encoded'][0];
                          }
                          post = {
                            title: item.title[0],
                            pathname: decodeURIComponent(item['wp:post_name'][0]),
                            content: item['content:encoded'][0],
                            summary: summary,
                            create_time: (0, _moment2.default)(new Date(item.pubDate[0])).format('YYYY-MM-DD HH:mm:ss'),
                            update_time: item['wp:post_date'][0],
                            status: postStatus[item['wp:status'][0]] || 0,
                            user_id: user.id,
                            comment_num: 0,
                            allow_comment: item['wp:comment_status'][0] === 'open',
                            is_public: item['wp:status'][0] !== 'private',
                            tag: item.hasOwnProperty('category') ? item.category.filter(function (item) {
                              return item.$.domain === 'post_tag';
                            }).map(function (item) {
                              return item._;
                            }) : [],
                            cate: cate
                          };

                          post.markdown_content = (0, _toMarkdown2.default)(post.content);
                          _context4.next = 18;
                          return postModelInstance.addPost(post);

                        case 18:
                          _context4.next = 23;
                          break;

                        case 20:
                          _context4.prev = 20;
                          _context4.t0 = _context4['catch'](0);
                          console.log(_context4.t0);
                        case 23:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this3, [[0, 20]]);
                }));
                return function (_x2) {
                  return ref.apply(this, arguments);
                };
              }());

              _promise2.default.all(postsPromise);

              //导入页面
              pages = channel.item.filter(function (item) {
                return item['wp:post_type'][0] === 'page';
              });
              pageModelInstance = this.model('page').setRelation('user');
              pagesPromise = pages.map(function () {
                var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(item) {
                  var user, summary, page;
                  return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this3.model('user').where({ name: item['dc:creator'][0] }).find();

                        case 2:
                          user = _context5.sent;
                          summary = item['excerpt:encoded'][0];

                          if (summary === '') {
                            summary = item['content:encoded'][0];
                          }

                          page = {
                            title: item.title[0],
                            pathname: decodeURIComponent(item['wp:post_name'][0]),
                            content: item['content:encoded'][0],
                            summary: summary,
                            create_time: (0, _moment2.default)(new Date(item.pubDate[0])).format('YYYY-MM-DD HH:mm:ss'),
                            update_time: item['wp:post_date'][0],
                            status: postStatus[item['wp:status'][0]] || 0,
                            user_id: user.id,
                            comment_num: 0,
                            allow_comment: item['wp:comment_status'][0] === 'open',
                            is_public: item['wp:status'][0] !== 'private'
                          };

                          page.markdown_content = (0, _toMarkdown2.default)(page.content);
                          _context5.next = 9;
                          return pageModelInstance.addPost(page);

                        case 9:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this3);
                }));
                return function (_x3) {
                  return ref.apply(this, arguments);
                };
              }());

              _promise2.default.all(pagesPromise);
              this.success('共导入文章 ' + (posts || []).length + ' 篇，页面 ' + (pages || []).length + ' 页，分类 ' + (categories || []).length + ' 个，标签 ' + (tags || []).length + ' 个');

            case 36:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function importFromWP() {
      return ref.apply(this, arguments);
    }

    return importFromWP;
  }();

  _class.prototype.formatArray = function formatArray(obj) {
    for (var i in obj) {
      if (Array.isArray(obj[i]) && obj[i].length === 1) {
        obj[i] = obj[i][0];
      } else if ((0, _typeof3.default)(obj[i]) === 'object') {
        obj[i] = this.formatArray(obj[i]);
      }
    }
    return obj;
  };

  return _class;
}(_base2.default);

exports.default = _class;