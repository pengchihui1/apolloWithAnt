import {
  Text,
  Flex,
  Textarea,
  Box
} from '@chakra-ui/react'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import WordNav from '../wordNav'
import http from './http'
import { useState, useEffect } from 'react'

const WordTranslationPage = () => {
  const [data, setData] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    http.get('/api/get_word', { params: { q: data } })
      .then((res) => {
        setResult(res.data.trans_result)
        // console.log(res.data.trans_result)
        // console.log(2222, result.length ? result[0].src : '')
        // console.log(3333, result.length ? result[0].dst : '')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [data])

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
                setData(e.target.value)
              }}
            />
          </Box>
        </Flex>
        <Box>
          <Text py={2}>单词：{result && result?.length ? result[0].src : ''}</Text>
          <Text py={2}>翻译内容：{result && result?.length ? result[0].dst : ''}</Text>
          {/* <Text py={2}>读音：</Text> */}
        </Box>
      </ContainPage>
    </Container>
  )
}

export default WordTranslationPage
