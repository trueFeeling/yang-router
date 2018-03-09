
import CreateMatcher from './CreateMatcher';
import HashHistory from './history/HashHistory';
import Html5History from './history/Html5History';
export default class Router{
    /**
     * 主文件, 类似express的app
     * @param {} mode 
     */
    constructor($mount, mode = 'hash'){
        // 选择锚点
        this.$mount = document.getElementById($mount);
        // 路由模式 hash or history API
        // 默认hash
        this._mode = mode ? mode : this.checkSupport();
        // 存储中间件
        this._middlewares = [];
        this._matcher = new CreateMatcher();
        this._history = this._mode === 'hash' 
            ? new HashHistory({matcher: this._matcher})
            : new Html5History({matcher: this._matcher});
    }
    /**
     * 浏览器是否支持history.pushState
     * 如果不支持, 降级到hash
     */
    checkSupport(){
        return !window.history.pushState ? "hash" : "history"
    }
    /**
     * 注册中间件
     * 中间件的传参是response(res), 也就是 Router
     * @param middleware 
     */
    use(middleware){
        this._middlewares.push(middleware);
    }
    /**
     * app.route('/', function(req, res){})
     * @param {*} path 
     * @param {*} controller 
     */
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
    /**
     * 渲染
     * @param ObjData 需要渲染的对象数据
     */
    render(ObjData){
        // res.render({title: 'home', username: 'test', team: 'test'})
        this.$mount.innerHTML = ObjData;
    }
    /**
     * path路径
     * @param {*} url 
     * @param {*} body 
     */
    go(url, body){
        console.log(url,body);
        console.log(this._history)
        this._history.go(url, body);
    }
    forward(){
        this._history.forward();
    }
    back(){
        this._history.back();
    }
    stop(){
        this._history.stop();
    }
}