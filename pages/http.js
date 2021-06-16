import axios from 'axios'
import Cors from 'cors'

// axios.defaults.baseURL = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
// axios.defaults.withCredentials = true
// axios.defaults.timeout = 100000
// axios.defaults.responseType = 'json'
// axios.defaults.headers = { 'Content-Type': 'application/json;charset=UTF-8' }

const http = {
  post: '',
  get: '',
  put: '',
  del: ''
}
axios.create(Cors())

axios.create({
  method: http.get ? 'get' : 'post',
  baseURL: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
  timeout: 10000,
  responseType: 'json',
  headers: http.get
    ? { 'Content-Type': 'application/json;charset=UTF-8' }
    : { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }
})
http.post = function (api, data) {
  // const params = JSON.stringify(data)
  const params = data
  return new Promise((resolve, reject) => {
    axios.post(api, params).then(res => {
      resolve(res)
    })
  })
}

http.get = async function (api, data) {
  // const params = JSON.stringify(data)
  const params = data
  return await new Promise((resolve, reject) => {
    axios.get(api, params).then(res => {
      resolve(res)
    })
  })
}
http.delete = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.delete(api, data).then(response => {
      resolve(response)
    })
  })
}

http.put = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.put(api, data).then(response => {
      resolve(response)
    })
  })
}
export default http
