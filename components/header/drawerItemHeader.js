import React, { memo } from 'react'
import {
  DrawerHeader
} from '@chakra-ui/react'
const DrawerItemHeader = (props) => {
  return (
    <DrawerHeader {...props} />
  )
}
export default memo(DrawerItemHeader)
