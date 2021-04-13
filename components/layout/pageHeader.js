import React, { memo, useContext } from 'react'
import {
  Box,
  useColorMode,
  Button,
  Menu,
  Avatar,
  MenuList,
  Link,
  MenuItem,
  Flex
} from '@chakra-ui/react'

import {
  Header as HeaderComponent,
  HeaderMenuButton,
  DrawerItemButton,
  DrawerItemDivider,
  HeaderLogo,
  HeaderCenter,
  HeaderMobileNav,
  HeaderRight
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
