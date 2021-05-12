import {
  Box,
  Input,
  Button,
  Flex,
  IconButton
} from '@chakra-ui/react'
import { useState } from 'react'

import DatePicker from 'react-datepicker'

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from 'components/table'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const SectionWord = () => {
  const [startAt, setStartAt] = useState(new Date())

  return (
    <Box>
      {/* 搜索 */}
      <Box className='date-picker-content' border='1px solid #CBD5E0' textAlign='center'>
        <DatePicker
          className='input'
          dateFormat='yyyy-MM-dd'
          selected={startAt}
          onChange={date => {
            setStartAt(date)
          }}
          autoComplete='off'
        />
      </Box>
      <Box d='flex' w={{ base: '100%', md: '700px' }} mx='auto' mt={4}>
        <Input
          marginLeft='0'
          placeholder='单词、翻译、读音'
          onChange={() => {}}
        />
        <Button
          colorScheme='blue'
          minW={{ base: 70, md: 100 }}
          fontSize={{ base: '14px', md: '16px' }}
          ml={2}
          isDisabled={false}
          onClick={() => {}}
        >
          搜索
        </Button>
        <Button
          colorScheme='blue'
          minW={{ base: 70, md: 100 }}
          fontSize={{ base: '14px', md: '16px' }}
          ml={2}
          isDisabled={false}
          onClick={() => {}}
        >
          新增
        </Button>
      </Box>
      {/* 表格 */}
      <Table my={6} textAlign='center'>
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>单词</TableCell>
            <TableCell>翻译</TableCell>
            <TableCell>读音</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>345</TableCell>
            <TableCell>345</TableCell>
            <TableCell>345</TableCell>
            <TableCell>345</TableCell>
            <TableCell w='15%'>
              <Flex justify='space-around'>
                <IconButton
                  colorScheme='blue'
                  icon={<EditIcon />}
                  size='sm'
                  my={2}
                  // onClick={() => { setIsInput(true) }}
                />
                <IconButton
                  colorScheme='blue'
                  icon={<DeleteIcon />}
                  size='sm'
                  my={2}
                  // onClick={() => {
                  //   deleteClick()
                  // }}
                />
              </Flex>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* 翻页 */}
      <Box my={2} d='flex' justifyContent='center'>
        <Button
          size='sm'
          mx={5}
          colorScheme='blue'
        >
          第一頁
        </Button>
        <Button
          size='sm'
          mx={5}
          colorScheme='cyan'
        >
          上一頁
        </Button>
        <Button
          size='sm'
          mx={5}
          colorScheme='teal'
        >
          下一頁
        </Button>
      </Box>
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
    </Box>
  )
}

export default SectionWord
