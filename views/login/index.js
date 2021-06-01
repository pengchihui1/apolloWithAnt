import {
  Box,
  Text
} from '@chakra-ui/react'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import SectionLogin from './sectionLogin'

const LoginPage = () => {
  return (
    <Container height='100vh'>
      {/* 头部 */}
      <HeadTop title='虚拟登入' />
      {/* 主体 */}
      <Box w='500px' border='1px solid #CBD5E0' p={10}>
        <SectionLogin />
        <Text>注意：进入单词系统可以设置密码，方便下次登入</Text>
      </Box>
    </Container>
  )
}

export default LoginPage
