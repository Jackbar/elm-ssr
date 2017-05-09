const paramToString = (obj) => {
  let param = [];
  for (var key in obj) {
    param.push(key + '=' + obj[key])
  }
  return param.join('&')
}
const resolveFetch = (e) => {
  var t = e.json();
  return e.status >= 200 && e.status < 300 ? t : t.then(Promise.reject.bind(Promise))
}

export {paramToString, resolveFetch}