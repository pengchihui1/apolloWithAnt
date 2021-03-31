import React, { memo } from 'react'
import {
  Box
} from '@chakra-ui/react'

const Container = (props) => {
  return (
    <Box
      width='full'
      maxWidth='1280px'
      mx='auto'
      px={2}
      {...props}
    />
  )
}

export default memo(Container)
