import React, { memo } from 'react'
import {
  Flex
} from '@chakra-ui/react'

const HeaderRight = (props) => {
  return (
    <Flex
      align='center'
      justify='flex-end'
      {...props}
    />
  )
}

export default memo(HeaderRight)
