import axios from 'axios'

// axios.defaults.baseURL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
// axios.defaults.headers = { 'Content-Type': 'application/json;charset=UTF-8' }
// axios.defaults.responseType = 'jsonp'

const http = {
  post: '',
  get: ''
}

http.post = function (api, data) {
  // const params = JSON.stringify(data)
  const params = data
  return new Promise((resolve, reject) => {
    axios.post(api, params).then(res => {
      resolve(res)
    })
  })
}

http.get = function (api, data) {
  // const params = JSON.stringify(data)
  const params = data
  return new Promise((resolve, reject) => {
    axios.get(api, params).then(res => {
      resolve(res)
    })
  })
}

export default http
