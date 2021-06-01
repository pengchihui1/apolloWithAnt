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
import { updateWordMutation } from 'shared/graphql/mutations/word/updateword'
import { deleteWordMutation } from 'shared/graphql/mutations/word/deleteWord'

const TableRowData = ({ word, refetchQueries }) => {
  const toast = useToast()

  const [isInput, setIsInput] = useState(false)

  // 旧值
  const oldValue = [word.word_date, word.word || '', word.translation || '', word.pronunciation || '']
  // 更改值
  const [content, setContent] = useState(oldValue)

  const [updateWord] = useMutation(updateWordMutation)
  const [deleteWord] = useMutation(deleteWordMutation)

  const updateClick = () => {
    updateWord({
      variables: {
        input: {
          id: word.id,
          wordAt: content[0],
          word: content[1],
          translation: content[2],
          pronunciation: content[3]
        }
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
    deleteWord({
      variables: {
        input: {
          id: word.id
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
      {/* 渲染查看 */}
      {!isInput && (
        <TableRow key={word.id}>
          <TableCell>{word?.seq_id}</TableCell>
          <TableCell>{format(new Date(content[0]), 'yyyy-MM-dd')}</TableCell>
          <TableCell>{content[1]}</TableCell>
          <TableCell>{content[2]}</TableCell>
          <TableCell>{content[3]}</TableCell>
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
      {/* 编辑 */}
      {!!isInput && (
        <TableRow key={word.id}>
          <TableCell>{word?.seq_id}</TableCell>
          <TableCell>
            <Box className='date-picker-content' border='1px solid #CBD5E0'>
              <DatePicker
                className='input'
                dateFormat='yyyy-MM-dd'
                selected={new Date(content[0])}
                onChange={date => {
                  content[0] = date.toISOString()
                  setContent([...content])
                }}
                autoComplete='off'
              />
            </Box>
          </TableCell>
          <TableCell>
            <Input
              textAlign='center'
              defaultValue={content[1] || ''}
              onInput={(e) => {
                content[1] = e.target.value
                setContent([...content])
              }}
            />
          </TableCell>
          <TableCell>
            <Input
              textAlign='center'
              defaultValue={content[2] || ''}
              onInput={(e) => {
                content[2] = e.target.value
                setContent([...content])
              }}
            />
          </TableCell>
          <TableCell>
            <Input
              textAlign='center'
              defaultValue={content[3] || ''}
              onInput={(e) => {
                content[3] = e.target.value
                setContent([...content])
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
                line-height:40px;
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
