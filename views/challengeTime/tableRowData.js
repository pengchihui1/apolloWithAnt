import {
  Flex,
  Button,
  IconButton,
  Box,
  Spinner
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import format from 'date-fns/format'

import { EditIcon, SearchIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Table,
  TableRow,
  TableCell
} from 'components/table'

import { useMutation } from '@apollo/react-hooks'
import { updateWordTimeQuery } from 'shared/graphql/mutations/wordTime/updateWordTime'
import { deleteWordTimeQuery } from 'shared/graphql/mutations/wordTime/deleteWordTime'

const TableRowData = ({ wordTime }) => {
  const router = useRouter()

  const [isInput, setIsInput] = useState(false)

  const [updateWordTime] = useMutation(updateWordTimeQuery)
  const [deleteWordTime] = useMutation(deleteWordTimeQuery)
  const updateClick = () => {
    updateWordTime({
      variables: {
        input: { id, startAt, endAt, time }
      }
    }).then(() => {
      // Router.replace(`/${schoolId}/dashboards/${schoolDashboardId}/classes/${clsdata.cls.seqId}`)
    }).catch(error => {
      console.log('报错')
    })
  }

  const deleteClick = () => {
    deleteWordTime({
      variables: { input: { id: wordTime.id } }
    }).then(() => {
      console.log('数据内容')
    }).catch(error => {
      console.log('报错')
    })
  }

  return (
    // 每行数据
    <TableRow key={wordTime.id}>
      <TableCell>{wordTime?.start_date ? format(new Date(wordTime?.start_date), 'yyyy-MM-dd') : ''}</TableCell>
      <TableCell>{wordTime?.end_date ? format(new Date(wordTime?.end_date), 'yyyy-MM-dd') : ''}</TableCell>
      <TableCell>{wordTime?.challenge_time}</TableCell>
      <TableCell>
        {!isInput && (
          <>
            <IconButton
              colorScheme='blue'
              icon={<EditIcon />}
              size='sm'
              my={2}
              onClick={() => { setIsInput(true) }}
            />
            <IconButton
              colorScheme='blue'
              icon={<DeleteIcon />}
              size='sm'
              my={2}
              onClick={() => { deleteClick() }}
            />
          </>
        )}
        {!!isInput && (
          <Flex justifyContent='center'>
            <Button
              variantColor='teal'
              size='xs'
              onClick={() => {
                updateClick()
              }}
            >
              保存
            </Button>
            <Button
              ml='10px'
              variantColor='teal'
              size='xs'
              onClick={() => {
                setIsInput(false)
              }}
            >
              取消
            </Button>
          </Flex>
        )}
      </TableCell>
    </TableRow>
  )
}
export default TableRowData
