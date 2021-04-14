import React, { memo } from 'react'
import {
  Divider
} from '@chakra-ui/react'
const DrawerItemDivider = (props) => {
  return (
    <Divider w='100%' {...props} />
  )
}
export default memo(DrawerItemDivider)
