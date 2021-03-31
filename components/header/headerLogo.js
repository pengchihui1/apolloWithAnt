import React, { memo } from 'react'
import {
  Flex
} from '@chakra-ui/react'

const HeaderLogo = (props) => {
  return (
    <Flex
      justify='flex-start'
      mx={2}
      {...props}
    />
  )
}

export default memo(HeaderLogo)
