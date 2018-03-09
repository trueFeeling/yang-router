# yang-router
front-end router using hash or history API
### install
```bash
# git clone https://github.com/trueFeeling/yang-router.git
# cd yang-router
# npm install
```
### usage
For development
```bash
# npm run dev
```
For production
```bash
# npm run build
```
### 工程
执行npm run dev之后，打开localhost:8080就能看到效果。examples下面的app.js是入口文件，需要在这里配置路由，routes里面是每个路由对应的controller

- [demo](https://truefeeling.github.io/#/home/?index=home)

### 思路
目前只实现了hash，整个思路是，我们有一个主文件Router.js，这个文件中我们定义了两大方法，use和route

use的作用是将所有的中间件全push到Router的middleware数组里面。route方法里面，我们调用了this._matcher的addRoutes方法。this._matcher其实是createMatcher的实例。
```javascript
route(path, controller){
        // 在执行controller之前, 先执行所有的中间件
        // 将所有routes及其controller添加进_matcher
        this._matcher.addRoutes(path, (req) => {
            this._middlewares.forEach(fn => {
                fn(req)
            });
            /**
             * res(response)实际是Router: this
             * callback(req, res)
             */
            console.log("传进来了......")
            controller&&controller(req, this)
        })
    }
```
createMatcher的作用是将配置文件的所有路由规则正则，并且解析我们每一次请求的url。它的match方法就是用于解析这个url。但是match方法是在HashHistory里面调用的。因为我们的Router 实例化的时候，传给了它。并将实例化的赋值给this._history
```javascript
this._history = this._mode === 'hash' 
            ? new HashHistory({matcher: this._matcher})
            : new Html5History({matcher: this._matcher});
```

addRoutes接收一个path和一个handler，handler其实就是 路由配置文件里面的所有中间件，以及app.route(path, controller)里每个路由对应的controller。path被正则化，用于我们的app页面匹配每个url，push到createMatcher的_routes里。

_toReg是将route(path, controller)的path正则化。
```javascript
addRoutes(path, handler){
        let routeReg = this._toReg({
            path: path,
            handler: handler,
            params: []
        });
        this._routes.push(routeReg);
    }
```
我们怎么样去截获一个请求呢？实际上用截获这个词，并不十分准确。在HashHistory里面，我们通过_setListener，实现对hash变化的监听。
```javascript
_setListener(){
        window.addEventListener('load', this._refresh);
        window.addEventListener('hashchange', this._refresh);
    }
```
当我们要从页面a到达页面b的时候，是通过点击页面a上面的连接，这个链接有一个onclick事件，go里面的参数就是我们的请求url。
```html
<li onclick="app.go('/order/fruit?price=100&time=now', {message: '订单'})">订单</li>
```
当我们点击它的时候，实际是我们先修改window.location.hash这个值(点击事件先触发了go方法)。this._cache[url] = body，存储了我们想要传入的信息。比如获取当前form表格的值。
```javascript
go(url, body){
        this._cache[url] = body;
        console.log("come here........")
        window.location.hash = `${url}`;
    }
//..................................//
_getHash (){
        // 参考Vue-router
        // window.location.hash不稳定, Firefox会发布新版本
        const href = window.location.href;
        const index = href.indexOf('#');
        return index === -1 ? '' : href.slice(index + 1)
    }
```
一旦hash被修改，我们的onhashchange事件就能监听到，然后触发_refresh方法，_refresh里面调用_getHash，获取这个hash值，然后调用传参进来的createMatcher的match方法，解析这个path(实际就是上面提到的url)；解析完之后返回一个matchedRoutes，这个matchedRoutes不仅包含解析完的param，还包括这个route对应的handler(handler包括中间件和路由对应的controller)。
```javascript
this._refresh = () => {
            // 每次hash变化, 获取变化后的hash
            console.log("refesh啦！............")
            const path = this._getHash();
            const matchedRoutes = this.matcher.match(path);
            this._matchedCount = matchedRoutes.length;
            this._fireHandlers(matchedRoutes, this._cache[path]);
        }
```
_fireHandlers是最终call handler，并且处理请求的最终函数。
```javascript
_fireHandlers(matchedRoutes, body) {
        console.log("I am the best one")
        for (let i = 0; i < matchedRoutes.length; i++) {
            // 匹配到的路由包含有待执行的controller
            const item = matchedRoutes[i];
            // 构造请求体
            const request = {
                body: body || {},
                query: item.query,
                params: item.params
            };
            def(request, 'route', item.path);
            def(request, 'url', item.url);
            item.handler(request)
        }
    }
```

## 参考
###### 非常感谢sme-router作者！
从他的代码中, 学习到了很多, 对Vue-router的理解也加深了更多！
- [Vue-router@v2.0.0](https://github.com/vuejs/vue-router/tree/v2.0.0/src)
- [sme-router](https://github.com/SME-FE/sme-router)
- [前端路由的不同方法实现](http://blog.csdn.net/summer7310/article/details/53491201)
