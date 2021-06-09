import {
  Text,
  Flex,
  Textarea,
  Box
} from '@chakra-ui/react'
import Md5 from './md5.min'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import WordNav from '../wordNav'
import http from './http'
import axios from 'axios'

const WordTranslationPage = () => {
  // 免费api接口 https://www.jianshu.com/p/0182e59df879
  return (
    <Container height='100vh'>
      <ContainPage>
        {/* 导航栏 */}
        <WordNav />
        {/* 头部 */}
        <HeadTop title='单词翻译' />
        <Flex justify='space-around'>
          <Box w='100%'>
            <Text mb='8px'>单词:</Text>
            <Textarea
              placeholder='Here is a sample placeholder'
              size='sm'
              height='auto'
              onChange={(e) => {
                const appid = '20210601000849775'
                const key = 'uBb7ZcKZjtJ1aFQsWARw'
                const from = 'auto'
                const to = 'auto'
                const query = 'word'// 取输入框的val
                const q = encodeURIComponent(query)// 编码UTF-8
                const salt = (new Date()).getTime()
                const str1 = appid + query + salt + key// 秘钥
                const sign = Md5(str1)// md5加密
                axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists'
                  //  { q, from, to, appid, salt, sign }
                ).then(res => {
                  console.log(res)
                }).catch(function (error) {
                  console.log(error)
                })
              }}
            />
          </Box>
        </Flex>
        <Box>
          <Text py={2}>内容：</Text>
          <Text py={2}>读音：</Text>
        </Box>
      </ContainPage>
    </Container>
  )
}

export default WordTranslationPage
