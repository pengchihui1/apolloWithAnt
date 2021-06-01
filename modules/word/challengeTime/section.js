import {
  Flex,
  Button,
  Box,
  Spinner,
  useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from 'components/table'

import TableRowData from './tableRowData'
import AddModal from './addModal'

import { useQuery } from '@apollo/react-hooks'
import { getWordTimeQuery } from 'shared/graphql/queries/wordTime/getWordTime'

const Section = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(getWordTimeQuery, {
    variables: { first: 5, after: (page - 1) * 5 }
  })

  let wordTimeList = {}

  if (data) {
    wordTimeList = data.getWordTime
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      {/* 添加按鈕 */}
      <Flex>
        <Button colorScheme='twitter' onClick={() => { onOpen() }}>
          添加
        </Button>
      </Flex>
      {isOpen && (
        <AddModal
          isOpen={isOpen}
          onClose={onClose}
          refetchQueries={[{
            query: getWordTimeQuery,
            variables: { first: 5, after: (page - 1) * 5 }
          }]}
        />
      )}
      {/* 主体 */}
      <Table my={6} textAlign='center'>
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>开始日期</TableCell>
            <TableCell>结束日期</TableCell>
            <TableCell>挑战时间</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 无数据 */}
          {!loading && !error && !data && (
            <Box as='tr'>
              <Box as='td' border='1px solid #e6e6e6' colSpan='5' p='10px' textAlign='center'>
                无数据
              </Box>
            </Box>
          )}
          {/* 数据加载中 */}
          {loading && !error && !data && (
            <Box as='tr' rowSpan='2'>
              <Box
                as='td'
                border='1px solid #e6e6e6'
                colSpan='5'
                p='10px'
                textAlign='center'
              >
                <Spinner />
              </Box>
            </Box>
          )}
          {/* 数据加载后 */}
          {!loading && data && wordTimeList.length && wordTimeList.map(wordTime => {
            return (
              <TableRowData
                key={wordTime?.id}
                wordTime={wordTime}
                refetchQueries={[{
                  query: getWordTimeQuery,
                  variables: { first: 5, after: (page - 1) * 5 }
                }]}
              />
            )
          })}
          {/* 没有长度时 */}
          {!loading && !wordTimeList.length && (<Box as='tr' rowSpan='2' />)}
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
          isDisabled={wordTimeList.length % 5 !== 0 || (wordTimeList.length % 5 === 0 && page % 5 === 0)}
          onClick={() => setPage(page + 1)}
        >
          下一頁
        </Button>
      </Box>
    </Box>
  )
}

export default Section
