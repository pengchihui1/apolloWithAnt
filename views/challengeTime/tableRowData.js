import {
    Flex,
    Button,
    IconButton,
    Box,
    Spinner
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { useRouter } from 'next/router'
  
  import { EditIcon ,SearchIcon} from '@chakra-ui/icons'
  import {
    Table,
    TableRow,
    TableCell
  } from 'components/table'

  const TableRowData.=({wordTime})=>{
    const router = useRouter()
    const [isInput, setIsInput] = useState(false)
      return (
      //   <TableRow key={wordTime.id}>
      //   <TableCell>{wordTime?.start_date ? format(new Date(wordTime?.start_date), 'yyyy-MM-dd') : ''}</TableCell>
      //   <TableCell>{wordTime?.end_date ? format(new Date(wordTime?.end_date), 'yyyy-MM-dd') : ''}</TableCell>
      //   <TableCell>{wordTime?.challenge_time}</TableCell>
      //   <TableCell>
      //     <IconButton
      //       colorScheme='blue'
      //       icon={<EditIcon />}
      //       size='sm'
      //       my={2}
      //       onClick={() => { }}
      //     />
      //   </TableCell>
      // </TableRow>
      )
  }
  export default TableRowData