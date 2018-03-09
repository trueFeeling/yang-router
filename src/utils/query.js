const decode = decodeURIComponent;
/**
 * 解析请求
 * @param {String} queryStr
 */
export default function queryParse(queryStr) {
  let query = {};
  // 去掉# ?
  queryStr = queryStr.trim().replace(/^(\?|#|&)/, '');

  if (!queryStr) {
    return null
  }
  // queryStr: year=1993&mounth=11&day=02
  queryStr.split('&').forEach(param => {
    // param: year=1993
    // parts: ["year", "1993"]
    const parts = param.replace(/\+/g, ' ').split('=');
    // key: year
    const key = decode(parts.shift());
    // val: 1993
    const val = parts.length > 0
      ? decode(parts.join('='))
      : null;
    query[key] = val;
  })

  return query
}