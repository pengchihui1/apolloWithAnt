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

const WordPage = () => {

  //  APP ID：20210601000849775
  //  密钥：uBb7ZcKZjtJ1aFQsWARw
  // 参考博客： https://blog.csdn.net/sheng_li/article/details/77483055
  const appid = '20210601000849775'
  const securityKey = 'uBb7ZcKZjtJ1aFQsWARw'

  const salt = (new Date).getTime();
  const from = 'en';
  const to = 'zh';



  return (
    <Container height='100vh'>
      <ContainPage>
        {/* 导航栏 */}
        <WordNav />
        {/* 头部 */}
        <HeadTop title='单词翻译' />
        <Flex justify='space-around'>
          <Box w='100%'>
            <Text mb='8px'>翻译:</Text>
            <Textarea
              placeholder='Here is a sample placeholder'
              size='sm'
              height='auto'
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

export default WordPage
