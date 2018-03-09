export default function check(req){
    if(!req.query)req.query={};
    if(req.query.money === "infinite"){
        req.query.money = "土豪你好！！！！！！！！！！";
    }
    if(!req.body){
        req.body = {};
        req.body.mes = `祝您用餐愉快, 您目前是在: ${location.hash}`
    }
    return
}