import {
  Flex,
  Button,
  IconButton,
  Box,
  Spinner,
  useToast,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  TableRow,
  TableCell
} from 'components/table'

import { useMutation } from '@apollo/react-hooks'
import { updateWordTimeMutation } from 'shared/graphql/mutations/wordTime/updateWordTime'
import { deleteWordTimeMutation } from 'shared/graphql/mutations/wordTime/deleteWordTime'

const TableRowData = ({ wordTime, refetchQueries }) => {
  const toast = useToast()

  const [isInput, setIsInput] = useState(false)

  const [startAt, setStartAt] = useState(new Date(wordTime.start_date))
  const [endAt, setEndAt] = useState(new Date(wordTime.end_date))
  const [time, setTime] = useState(wordTime.challenge_time)

  const [updateWordTime] = useMutation(updateWordTimeMutation)
  const [deleteWordTime] = useMutation(deleteWordTimeMutation)

  const updateClick = () => {
    updateWordTime({
      variables: {
        input: { id: wordTime.id, startAt, endAt, time: parseInt(time) }
      },
      refetchQueries
    }).then(() => {
      toast({
        title: '系统提示',
        description: '编辑成功',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
      setIsInput(false)
    }).catch(error => {
      toast({
        title: '系统提示',
        description: error?.message || '编辑失败',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
    })
  }

  const deleteClick = () => {
    deleteWordTime({
      variables: {
        input: {
          id: wordTime.id
        }
      },
      refetchQueries
    }).then(() => {
      toast({
        title: '系统提示',
        description: '删除成功',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
    }).catch(error => {
      const message = error.message.replace('GraphQL error: ', '') || 'error'
      toast({
        title: '系统提示',
        description: message || '删除失败',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
    })
  }
  return (
    <>
      {!isInput && (
        <TableRow key={wordTime.id}>
          <TableCell>{wordTime?.seq_id}</TableCell>
          <TableCell>{wordTime?.start_date ? format(new Date(wordTime?.start_date), 'yyyy-MM-dd') : ''}</TableCell>
          <TableCell>{wordTime?.end_date ? format(new Date(wordTime?.end_date), 'yyyy-MM-dd') : ''}</TableCell>
          <TableCell>{wordTime?.challenge_time}</TableCell>
          <TableCell>
            <Flex justify='space-around'>
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
                onClick={() => {
                  deleteClick()
                }}
              />
            </Flex>
          </TableCell>
        </TableRow>
      )}
      {!!isInput && (
        <TableRow key={wordTime.id}>
          <TableCell>{wordTime?.seq_id}</TableCell>
          <TableCell>
            <Box className='date-picker-content' border='1px solid #CBD5E0'>
              <DatePicker
                // id='startAt'
                className='input'
                dateFormat='yyyy-MM-dd'
                selected={startAt}
                onChange={date => {
                  setStartAt(date)
                }}
                autoComplete='off'
              />
            </Box>
          </TableCell>
          <TableCell>
            <Box className='date-picker-content' border='1px solid #CBD5E0'>
              <DatePicker
                className='input'
                dateFormat='yyyy-MM-dd'
                selected={endAt}
                onChange={date => {
                  setEndAt(date)
                }}
                autoComplete='off'
              />
            </Box>
          </TableCell>
          <TableCell>
            <Input
              textAlign='center'
              defaultValue={time || ''}
              onInput={(e) => {
                setTime(e.target.value)
              }}
            />
          </TableCell>
          <TableCell>
            <Flex justifyContent='space-around'>
              <Button
                colorScheme='teal'
                size='xs'
                onClick={() => {
                  updateClick()
                }}
              >
                保存
              </Button>
              <Button
                ml='10px'
                colorScheme='teal'
                size='xs'
                onClick={() => {
                  setIsInput(false)
                }}
              >
                取消
              </Button>
            </Flex>
          </TableCell>
          {/* 為了去掉點擊是會有黑色邊框 */}
          <style jsx global>
            {`
              .input{
                text-align: center;
                cursor:pointer;
                line-height:30px;
                background-color: rgba(255,255,255,0.01);
              }
              .date-picker-content button:focus,
              .input:focus{
                outline: none;
              }
           `}
          </style>
        </TableRow>
      )}
    </>
  )
}
export default TableRowData
