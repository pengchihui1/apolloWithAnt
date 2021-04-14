import {
  Text,
  Flex,
  Textarea,
  Box
} from '@chakra-ui/react'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'

const WordPage = () => {
  return (
    <Container height='100vh'>
      <ContainPage>
        {/* 头部 */}
        <HeadTop title='单词翻译' />
        {/* 翻译   */}
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
        {/* 翻译   */}
        <Box>
          <Text py={2}>内容：</Text>
          <Text py={2}>读音：</Text>
        </Box>
      </ContainPage>
    </Container>
  )
}

export default WordPage
