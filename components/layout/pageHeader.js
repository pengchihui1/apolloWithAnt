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
    <HeaderComponent containerProps={{ h: '4rem', px: '2' }} bg='gray.50' {...rest}>
      <HeaderLogo>
        <Box as='a'>
          <PageLogo />
        </Box>
      </HeaderLogo>
      <HeaderCenter my={2}>
        <Flex w='300px' justify='space-around'>
          <Button> 首頁 </Button>
          <Button> 學校專頁 </Button>
          <Button> 搜索 </Button>
        </Flex>
      </HeaderCenter>
    </HeaderComponent>
  )
}

export default Header
