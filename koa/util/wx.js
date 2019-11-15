const { weappInfo } = require('../config')
const request = require('request');
exports.getOpenId = (code) => {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${weappInfo.appid}&secret=${weappInfo.secret}&js_code=${code}&grant_type=authorization_code`
  return new Promise( (resolve, reject) => {
    request(url, function (error, response, body) {
      if( error ){
        reject(error)
      }else {
        resolve(JSON.parse(body))
      }
    });
  })

}
