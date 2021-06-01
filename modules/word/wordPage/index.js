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
import ErrorList from './errorList'

const WordPage = () => {
  return (
    <Container>
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
        <ErrorList />
      </Flex>
    </Container>
  )
}

export default WordPage
