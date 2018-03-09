(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _Router = __webpack_require__(1);

var _Router2 = _interopRequireDefault(_Router);

var _home = __webpack_require__(9);

var _home2 = _interopRequireDefault(_home);

var _about = __webpack_require__(10);

var _about2 = _interopRequireDefault(_about);

var _order = __webpack_require__(11);

var _order2 = _interopRequireDefault(_order);

var _find = __webpack_require__(12);

var _find2 = _interopRequireDefault(_find);

var _check = __webpack_require__(13);

var _check2 = _interopRequireDefault(_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = new _Router2.default('router', 'hash');
app.use(_check2.default);
app.route('/', _home2.default);
app.route('', _home2.default);
app.route('/home/:brand', _home2.default);
app.route('/order/:type', _order2.default);
app.route('/find/:what', _find2.default);
app.route('/about/:user', _about2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CreateMatcher = __webpack_require__(2);

var _CreateMatcher2 = _interopRequireDefault(_CreateMatcher);

var _HashHistory = __webpack_require__(5);

var _HashHistory2 = _interopRequireDefault(_HashHistory);

var _Html5History = __webpack_require__(8);

var _Html5History2 = _interopRequireDefault(_Html5History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    /**
     * 主文件, 类似express的app
     * @param {} mode 
     */
    function Router($mount) {
        var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hash';

        _classCallCheck(this, Router);

        // 选择锚点
        this.$mount = document.getElementById($mount);
        // 路由模式 hash or history API
        // 默认hash
        this._mode = mode ? mode : this.checkSupport();
        // 存储中间件
        this._middlewares = [];
        this._matcher = new _CreateMatcher2.default();
        this._history = this._mode === 'hash' ? new _HashHistory2.default({ matcher: this._matcher }) : new _Html5History2.default({ matcher: this._matcher });
    }
    /**
     * 浏览器是否支持history.pushState
     * 如果不支持, 降级到hash
     */


    _createClass(Router, [{
        key: 'checkSupport',
        value: function checkSupport() {
            return !window.history.pushState ? "hash" : "history";
        }
        /**
         * 注册中间件
         * 中间件的传参是response(res), 也就是 Router
         * @param middleware 
         */

    }, {
        key: 'use',
        value: function use(middleware) {
            this._middlewares.push(middleware);
        }
        /**
         * app.route('/', function(req, res){})
         * @param {*} path 
         * @param {*} controller 
         */

    }, {
        key: 'route',
        value: function route(path, controller) {
            var _this = this;

            // 在执行controller之前, 先执行所有的中间件
            // 将所有routes及其controller添加进_matcher
            this._matcher.addRoutes(path, function (req) {
                _this._middlewares.forEach(function (fn) {
                    fn(req);
                });
                /**
                 * res(response)实际是Router: this
                 * callback(req, res)
                 */
                console.log("传进来了......");
                controller && controller(req, _this);
            });
        }
        /**
         * 渲染
         * @param ObjData 需要渲染的对象数据
         */

    }, {
        key: 'render',
        value: function render(ObjData) {
            // res.render({title: 'home', username: 'test', team: 'test'})
            this.$mount.innerHTML = ObjData;
        }
        /**
         * path路径
         * @param {*} url 
         * @param {*} body 
         */

    }, {
        key: 'go',
        value: function go(url, body) {
            console.log(url, body);
            console.log(this._history);
            this._history.go(url, body);
        }
    }, {
        key: 'forward',
        value: function forward() {
            this._history.forward();
        }
    }, {
        key: 'back',
        value: function back() {
            this._history.back();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this._history.stop();
        }
    }]);

    return Router;
}();

exports.default = Router;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pathToRegexp = __webpack_require__(3);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _query = __webpack_require__(4);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateMatcher = function () {
    /**
     * 记录所有的路由数组
     * [{ 
     *    '/home': fn
     * }]
     */
    function CreateMatcher() {
        _classCallCheck(this, CreateMatcher);

        this._routes = [];
    }
    /**
     * 在HashHistory中调用
     * @param {String} url 每次的url请求
     */


    _createClass(CreateMatcher, [{
        key: 'match',
        value: function match(url) {
            var matchedRoutes = [];
            var queryStr = '';
            var idx = url.indexOf('?');
            var notMatched = true;

            if (idx > -1) {
                //截取?后面的参数
                queryStr = url.substr(idx);
                url = url.slice(0, idx);
            }
            for (var i = 0; i < this._routes.length; i++) {
                // 根据每一条routes, 解析
                var route = this._routes[i];
                var result = route.reg.exec(url);

                if (result) {
                    if (route.path !== '*') notMatched = false;
                    // after matched a path then ignore '*' path
                    if (!notMatched && route.path === '*') continue;

                    matchedRoutes.push({
                        path: route.path,
                        url: url + queryStr,
                        params: this._getParams(route.params, result),
                        query: (0, _query2.default)(queryStr),
                        handler: route.handler
                    });
                }
            }
            return matchedRoutes;
        }
        /**
         * 添加正则后的路由,  
         * app.route(path,handler)
         * @param {String} path 
         * @param {Function} handler 
         */

    }, {
        key: 'addRoutes',
        value: function addRoutes(path, handler) {
            var routeReg = this._toReg({
                path: path,
                handler: handler,
                params: []
            });
            this._routes.push(routeReg);
        }
        /**
         * 替换为正则
         */

    }, {
        key: '_toReg',
        value: function _toReg(routeObj) {
            routeObj.reg = (0, _pathToRegexp2.default)(routeObj.path, routeObj.params, { end: false });
            return routeObj;
        }
        /**
         * 获取参数
         * @param {Array} keys 
         * @param {*} matchedResult 
         */

    }, {
        key: '_getParams',
        value: function _getParams() {
            var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var matchedResult = arguments[1];

            var params = {};
            for (var i = 0; i < keys.length; i++) {
                params[keys[i].name] = matchedResult[i + 1];
            }

            return params;
        }
    }]);

    return CreateMatcher;
}();

exports.default = CreateMatcher;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token)

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token)

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryParse;
var decode = decodeURIComponent;
/**
 * 解析请求
 * @param {String} queryStr
 */
function queryParse(queryStr) {
  var query = {};
  // 去掉# ?
  queryStr = queryStr.trim().replace(/^(\?|#|&)/, '');

  if (!queryStr) {
    return null;
  }
  // queryStr: year=1993&mounth=11&day=02
  queryStr.split('&').forEach(function (param) {
    // param: year=1993
    // parts: ["year", "1993"]
    var parts = param.replace(/\+/g, ' ').split('=');
    // key: year
    var key = decode(parts.shift());
    // val: 1993
    var val = parts.length > 0 ? decode(parts.join('=')) : null;
    query[key] = val;
  });

  return query;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _History2 = __webpack_require__(6);

var _History3 = _interopRequireDefault(_History2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 使用Hash
 */
var HashHistory = function (_History) {
    _inherits(HashHistory, _History);

    function HashHistory(opts) {
        _classCallCheck(this, HashHistory);

        /**
         * 每次hash变化触发的handler
         * 浏览器首次打开页面的时候, 需要初始化
         * 并记录当前的location.hash
         */
        var _this = _possibleConstructorReturn(this, (HashHistory.__proto__ || Object.getPrototypeOf(HashHistory)).call(this, opts));
        // 初始化监听


        _this._init();
        _this._setListener();
        _this._cache = {};
        return _this;
    }
    /**
     * 监听hash变化
     */


    _createClass(HashHistory, [{
        key: '_setListener',
        value: function _setListener() {
            window.addEventListener('load', this._refresh);
            window.addEventListener('hashchange', this._refresh);
        }
        /**
         * 每次hash变化的handler
         */

    }, {
        key: '_init',
        value: function _init() {
            var _this2 = this;

            this._refresh = function () {
                // 每次hash变化, 获取变化后的hash
                console.log("refesh啦！............");
                var path = _this2._getHash();
                var matchedRoutes = _this2.matcher.match(path);
                _this2._matchedCount = matchedRoutes.length;
                _this2._fireHandlers(matchedRoutes, _this2._cache[path]);
            };
        }
        /**
         * 获取当前页面url的hash值
         */

    }, {
        key: '_getHash',
        value: function _getHash() {
            // 参考Vue-router
            // window.location.hash不稳定, Firefox会发布新版本
            var href = window.location.href;
            var index = href.indexOf('#');
            return index === -1 ? '' : href.slice(index + 1);
        }
        /**
         * sethash, 通过修改location.hash, 
         * 来触发hashchange事件, 
         * 从而触发对应的handler
         * @param {String} url 
         * @param {*} body 
         */

    }, {
        key: 'go',
        value: function go(url, body) {
            this._cache[url] = body;
            console.log("come here........");
            window.location.hash = '' + url;
        }
        /**
         * 前进
         */

    }, {
        key: 'forward',
        value: function forward() {
            window.history.go(1);
        }
        /**
         * 后退
         */

    }, {
        key: 'back',
        value: function back() {
            window.history.go(-1);
        }
    }]);

    return HashHistory;
}(_History3.default);

exports.default = HashHistory;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _def = __webpack_require__(7);

var _def2 = _interopRequireDefault(_def);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 公共方法
 */
var History = function () {
    function History(opts) {
        _classCallCheck(this, History);

        this.matcher = opts.matcher;
    }

    _createClass(History, [{
        key: '_fireHandlers',
        value: function _fireHandlers(matchedRoutes, body) {
            for (var i = 0; i < matchedRoutes.length; i++) {
                // 匹配到的路由包含有待执行的controller
                var item = matchedRoutes[i];
                // 构造请求体
                var request = {
                    body: body || {},
                    query: item.query,
                    params: item.params
                };
                (0, _def2.default)(request, 'route', item.path);
                (0, _def2.default)(request, 'url', item.url);
                item.handler(request);
            }
        }
    }]);

    return History;
}();

exports.default = History;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = def;
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    writable: false,
    enumerable: true,
    value: value
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//TODO


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spring;
function spring(req, res) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render("\n    <div class=\"content-container\">\n      <h2 class=\"content-header\">\u5916\u5356</h2>\n      <section>\n        <div>params: " + JSON.stringify(params) + "</div>\n        <div>query: " + JSON.stringify(query) + "</div>\n        <div>body: " + JSON.stringify(body) + "</div>\n        <section class='example-box'>\n          <div class='example-head'># example</div>\n          <div class='mes'>" + body.mes + "}</div>\n        </section>\n      </section>\n    </div>\n  ");
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = winter;
function winter(req, res) {
  var query = req.query,
      params = req.params,
      body = req.body;

  res.render("\n    <div class=\"content-container\">\n    <h2 class=\"content-header\">\u5173\u4E8E</h2>\n    <section>\n      <div>params: " + JSON.stringify(params) + "</div>\n      <div>query: " + JSON.stringify(query) + "</div>\n      <div>body: " + JSON.stringify(body) + "</div>\n      <div></div>\n    </section>\n    <section class='example-box'>\n      <div class='example-head'># example</div>\n      <div class='mes'>" + body.mes + "}</div>\n    </section>\n  </div>\n    ");
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spring;
function spring(req, res) {
  //const { query, params, body } = req;
  console.log('req', req);
  console.log('res:', res);
  var query = req.query;
  var params = req.params;
  var body = req.body;
  var style = '\n     border-bottom: 1px, solid, #ddd;\n     color: blue;\n     font-weight: bold;\n     width:100vw;\n     height:10px;\n    ';
  res.render('\n      <div class="content-container">\n        <h2 class="content-header">\u8BA2\u5355</h2>\n        <section>\n          <div style="' + style + '">hello here</div>\n          <div>params: ' + JSON.stringify(params) + '</div>\n          <div>query: ' + JSON.stringify(query) + '</div>\n          <div>body: ' + JSON.stringify(body) + '</div>\n        </section>\n        <section class=\'example-box\'>\n          <div class=\'example-head\'># example</div>\n          <div class=\'mes\'>' + body.mes + '}</div>\n        </section>\n      </div>\n    ');
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spring;
function spring(req, res) {
  var query = req.query,
      params = req.params,
      body = req.body;


  res.render("\n      <div class=\"content-container\">\n        <h2 class=\"content-header\">\u8BA2\u5355</h2>\n        <section>\n          <div>params: " + JSON.stringify(params) + "</div>\n          <div>query: " + JSON.stringify(query) + "</div>\n          <div>body: " + JSON.stringify(body) + "</div>\n          <div></div>\n        </section>\n        <section class='example-box'>\n          <div class='example-head'># example</div>\n          <div class='mes'>" + body.mes + "}</div>\n        </section>\n      </div>\n    ");
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = check;
function check(req) {
    if (!req.query) req.query = {};
    if (req.query.money === "infinite") {
        req.query.money = "土豪你好！！！！！！！！！！";
    }
    if (!req.body) {
        req.body = {};
        req.body.mes = "\u795D\u60A8\u7528\u9910\u6109\u5FEB, \u60A8\u76EE\u524D\u662F\u5728: " + location.hash;
    } else if (JSON.stringify(req.body) === "{}") {
        req.body.mes = "\u795D\u60A8\u7528\u9910\u6109\u5FEB, \u60A8\u76EE\u524D\u662F\u5728: " + location.hash;
    }
    return;
}

/***/ })
/******/ ]);
});