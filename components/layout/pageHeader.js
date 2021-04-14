import React from 'react'

import {
  Box,
  Flex,
  Button
} from '@chakra-ui/react'

import {
  Header as HeaderComponent,
  HeaderLogo,
  HeaderCenter
} from 'components/header'

import { IoMdPaper, IoMdSearch } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'

import PageLogo from './pageLogo'

const Header = ({ hideNavLinks = false, loading = false, schooluser, ...rest }) => {
  return (
    <HeaderComponent containerProps={{ h: '4rem', px: '2' }} {...rest}>
      <HeaderLogo>
        <Box as='a'>
          <PageLogo />
        </Box>
      </HeaderLogo>
      <HeaderCenter>
        <Flex maxW='400px'>
          <Button icon={IoMdPaper}> 首頁 </Button>
          <Button icon={MdDashboard}> 學校專頁 </Button>
          <Button icon={IoMdSearch}> 搜索 </Button>
        </Flex>
      </HeaderCenter>
    </HeaderComponent>
  )
}

export default Header
