import path2Reg from 'path-to-regexp';
import parseQuery from './utils/query';
export default class CreateMatcher{
    /**
     * 记录所有的路由数组
     * [{ 
     *    '/home': fn
     * }]
     */
    constructor(){
        this._routes = [];
    }
    /**
     * 在HashHistory中调用
     * @param {String} url 每次的url请求
     */
    match(url){
        let matchedRoutes = [];
        let queryStr = '';
        let idx = url.indexOf('?');
        let notMatched = true;

        if(idx > -1){
            //截取?后面的参数
            queryStr = url.substr(idx);
            url = url.slice(0, idx);
        }    
        for (let i = 0; i < this._routes.length; i++) {
            // 根据每一条routes, 解析
            let route = this._routes[i];
            let result = route.reg.exec(url);
      
            if (result) {
              if (route.path !== '*') notMatched = false
              // after matched a path then ignore '*' path
              if (!notMatched && route.path === '*') continue
      
              matchedRoutes.push({
                path: route.path,
                url: url + queryStr,
                params: this._getParams(route.params, result),
                query: parseQuery(queryStr),
                handler: route.handler
              })
            }
          }
        return matchedRoutes
    }
    /**
     * 添加正则后的路由,  
     * app.route(path,handler)
     * @param {String} path 
     * @param {Function} handler 
     */
    addRoutes(path, handler){
        let routeReg = this._toReg({
            path: path,
            handler: handler,
            params: []
        });
        this._routes.push(routeReg);
    }
    /**
     * 替换为正则
     */
    _toReg(routeObj){
        routeObj.reg = path2Reg(
            routeObj.path, 
            routeObj.params, 
            {end: false}
        );
        return routeObj
    }
    /**
     * 获取参数
     * @param {Array} keys 
     * @param {*} matchedResult 
     */
    _getParams (keys = [], matchedResult) {
        let params = {}
        for (let i = 0; i < keys.length; i++) {
          params[keys[i].name] = matchedResult[i + 1]
        }
    
        return params
    }
    
}