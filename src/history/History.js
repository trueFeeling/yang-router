import def from '../utils/def';
/**
 * 公共方法
 */
export default class History {
    constructor(opts) {
        this.matcher = opts.matcher;
    }
    _fireHandlers(matchedRoutes, body) {
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

}