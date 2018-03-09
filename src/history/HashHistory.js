import History from './History';
/**
 * 使用Hash
 */
export default class HashHistory extends History{
    constructor(opts){
        // 初始化监听
        super(opts);
        /**
         * 每次hash变化触发的handler
         * 浏览器首次打开页面的时候, 需要初始化
         * 并记录当前的location.hash
         */
        this._init();
        this._setListener();
        this._cache = {};
    }
    /**
     * 监听hash变化
     */
    _setListener(){
        window.addEventListener('load', this._refresh);
        window.addEventListener('hashchange', this._refresh);
    }
    /**
     * 每次hash变化的handler
     */
    _init(){
        this._refresh = () => {
            // 每次hash变化, 获取变化后的hash
            console.log("refesh啦！............")
            const path = this._getHash();
            const matchedRoutes = this.matcher.match(path);
            this._matchedCount = matchedRoutes.length;
            this._fireHandlers(matchedRoutes, this._cache[path]);
        }
    }
    /**
     * 获取当前页面url的hash值
     */
    _getHash (){
        // 参考Vue-router
        // window.location.hash不稳定, Firefox会发布新版本
        const href = window.location.href;
        const index = href.indexOf('#');
        return index === -1 ? '' : href.slice(index + 1)
    }
    /**
     * sethash, 通过修改location.hash, 
     * 来触发hashchange事件, 
     * 从而触发对应的handler
     * @param {String} url 
     * @param {*} body 
     */
    go(url, body){
        this._cache[url] = body;
        console.log("come here........")
        window.location.hash = `${url}`;
    }
    /**
     * 前进
     */
    forward(){
        window.history.go(1);
    }
    /**
     * 后退
     */
    back(){
        window.history.go(-1);
    }
}