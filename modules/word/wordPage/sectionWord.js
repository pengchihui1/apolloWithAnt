import {
  Box,
  Input,
  Button,
  Spinner,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

import DatePicker from 'react-datepicker'

import AddModal from './addModal'

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from 'components/table'

import { useQuery } from '@apollo/react-hooks'
import { getWordsFilterQuery } from 'shared/graphql/queries/word/getWord'

import TableRowData from './tableRowData'

const SectionWord = () => {
  // 新增modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  // 日期
  const [timeAt, setTimeAt] = useState(new Date())
  // 搜索
  const [search, setSearch] = useState('')
  // 翻页
  const [page, setPage] = useState(1)

  // 一天开始时间
  const startAt = new Date(timeAt)
  startAt.setHours(0)
  startAt.setMinutes(0)
  startAt.setSeconds(0)

  // 一天结束时间
  const endAt = new Date(timeAt)
  endAt.setHours(23)
  endAt.setMinutes(59)
  endAt.setSeconds(59)
  endAt.setMilliseconds(0)

  const { data, loading, error } = useQuery(getWordsFilterQuery, {
    variables: {
      first: 10,
      after: (page - 1) * 10,
      filter: {
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        search
      }
    }
  })
  if (error) {
    return null
  }

  let node = []
  let pageInfo
  if (data) {
    node = data?.getWordsFilter?.edges.map(item => item.node) || []
    pageInfo = data?.getWordsFilter.pageInfo
  }

  return (
    <Box>
      {/* 搜索 */}
      <Box className='date-picker-content' border='1px solid #CBD5E0' textAlign='center'>
        <DatePicker
          className='input'
          dateFormat='yyyy-MM-dd'
          selected={timeAt}
          onChange={date => {
            setTimeAt(date)
          }}
          autoComplete='off'
        />
      </Box>
      <Box d='flex' w={{ base: '100%', md: '700px' }} mx='auto' mt={4}>
        <Input
          marginLeft='0'
          placeholder='单词'
          value={search || ''}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
        <Button
          colorScheme='blue'
          minW={{ base: 70, md: 100 }}
          fontSize={{ base: '14px', md: '16px' }}
          ml={2}
          onClick={() => {
            setSearch('')
          }}
        >
          清空
        </Button>
        <Button
          colorScheme='blue'
          minW={{ base: 70, md: 100 }}
          fontSize={{ base: '14px', md: '16px' }}
          ml={2}
          isDisabled={false}
          onClick={() => {
            onOpen()
          }}
        >
          新增
        </Button>
        {isOpen && (
          <AddModal
            isOpen={isOpen}
            onClose={onClose}
            refetchQueries={[{
              query: getWordsFilterQuery,
              variables: {
                first: 10,
                after: (page - 1) * 10,
                filter: {
                  startAt: startAt.toISOString(),
                  endAt: endAt.toISOString(),
                  search
                }
              }
            }]}
          />
        )}
      </Box>
      {/* 表格 */}
      <Table my={6} textAlign='center'>
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>日期</TableCell>
            <TableCell>单词</TableCell>
            <TableCell>翻译</TableCell>
            <TableCell>读音</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 数据加载中 */}
          {loading && !error && !data && (
            <Box as='tr' rowSpan='4'>
              <Box
                as='td'
                border='1px solid #e6e6e6'
                colSpan='6'
                p='10px'
                textAlign='center'
              >
                <Spinner />
              </Box>
            </Box>
          )}
          {/* 无数据 */}
          {!loading && !error && !node.length && (
            <Box as='tr' rowSpan='4'>
              <Box as='td' border='1px solid #e6e6e6' colSpan='6' py={10} textAlign='center'>
                无数据
              </Box>
            </Box>
          )}
          {!loading && node?.map(word => {
            return (
              <TableRowData
                key={word.id}
                word={word}
                refetchQueries={[{
                  query: getWordsFilterQuery,
                  variables: {
                    first: 10,
                    after: (page - 1) * 10,
                    filter: {
                      startAt: startAt.toISOString(),
                      endAt: endAt.toISOString(),
                      search
                    }
                  }
                }]}
              />
            )
          })}
        </TableBody>
      </Table>
      {/* 翻頁 */}
      <Box mb={10} d='flex' justifyContent='center'>
        {page !== 1 && (
          <Button
            size='sm'
            mx={5}
            colorScheme='blue'
            onClick={() => setPage(1)}
          >
            第一頁
          </Button>
        )}
        <Button
          size='sm'
          mx={5}
          colorScheme='cyan'
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          上一頁
        </Button>
        <Button
          size='sm'
          mx={5}
          isDisabled={!pageInfo?.hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          下一頁
        </Button>
      </Box>
      {/* 為了去掉點擊是會有黑色邊框  */}
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
