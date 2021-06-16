import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import http from '../http'
import Md5 from '../md5.min'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS']
  })
)

export default async function handler(req, res) {
  await cors(req, res)
  // console.log(req.query.q)
  const appid = '20210601000849775'
  const key = 'uBb7ZcKZjtJ1aFQsWARw'
  const from = 'auto'
  const to = 'auto'
  const query = req.query.q// 取输入框的val
  const q = encodeURIComponent(query)// 编码UTF-8
  const salt = (new Date()).getTime()
  const str1 = appid + query + salt + key// 秘钥
  const sign = Md5(str1)// md5加密
  const result = await http.get('http://api.fanyi.baidu.com/api/trans/vip/translate', { params: { q, from, to, appid, salt, sign } })
  // console.log(result.data)
  res.json(result.data)
}
