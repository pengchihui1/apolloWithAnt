import React, { memo } from 'react'
import {
  Box
} from '@chakra-ui/react'

import TableBody from './tableBody'
import TableCell from './tableCell'
import TableHead from './tableHead'
import TableRow from './tableRow'

// table component
const Table = memo((props) => {
  return (
    <Box
      as='table'
      w='100%'
      m='auto'
      fontSize='14px'
      letterSpacing='0.05rem'
      {...props}
    />
  )
})

export default Table

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
}
