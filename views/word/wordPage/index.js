import {
  Box,
  Text,
  Flex
} from '@chakra-ui/react'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'

import SectionWord from './sectionWord'

import WordNav from '../wordNav'

const WordPage = () => {
  return (
    <Container height='100vh'>
      <Flex>
        <ContainPage>
          {/* 导航栏 */}
          <WordNav />
          {/* 头部 */}
          <HeadTop title='单词系统' />
          {/* 主体 */}
          <SectionWord />
        </ContainPage>
        {/* 错误排行榜 */}
        <Box mt={10} maxH='400px' minW='200px' border='1px solid #CBD5E0' borderRadius='10px' p={6}>
          <Text textAlign='center' mb={2}>排行榜</Text>
          <Flex justify='space-around'>
            <Text>name</Text>
            <Text>5次</Text>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

export default WordPage
