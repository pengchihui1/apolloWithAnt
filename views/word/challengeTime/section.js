import {
  Flex,
  Button,
  // IconButton,
  Box
  // Spinner
} from '@chakra-ui/react'
import { useState } from 'react'

// import { EditIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from 'components/table'

// import format from 'date-fns/format'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'

// import TableRowData from './tableRowData'

import { useQuery } from '@apollo/react-hooks'
import { getWordTimeQuery } from 'shared/graphql/queries/wordTime/getWordTime'

const Section = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(getWordTimeQuery, {
    variables: { first: 5, after: (page - 1) * 10 },
    fetchPolicy: 'network-only'
  })
  let wordTimeList = {}
  if (data) {
    wordTimeList = data.getWordTime
  }

  return (
    <Box>
      {/* 添加按鈕 */}
      <Flex><Button colorScheme='twitter'>添加</Button></Flex>

      {/* 主体 */}
      <Table my={6} textAlign='center'>
        <TableHead>
          <TableRow>
            <TableCell>开始日期</TableCell>
            <TableCell>结束日期</TableCell>
            <TableCell>挑战时间</TableCell>
            <TableCell>操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 数据加载中 */}
          {loading && !error && !data && (
            <Box as='tr'>
              <Box as='td' border='1px solid #e6e6e6' colSpan='4' p='10px' textAlign='center'>
                無數據
              </Box>
            </Box>
          )}
          {/* 数据加载后 */}
          {wordTimeList.length && wordTimeList.map(wordTime => {
            return (
              1234
            // <TableRowData key={wordTime.id} wordTime={wordTime} />
            // <TableRow key={wordTime.id}>
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
          })}
        </TableBody>
      </Table>
      {/* 翻頁 */}
      <Box py={2} d='flex' justifyContent='center'>
        {page !== 1 && (
          <Button
            size='sm'
            mx={5}
            variantColor='blue'
            onClick={() => setPage(1)}
          >
            第一頁
          </Button>
        )}
        <Button
          size='sm'
          mx={5}
          variantColor='cyan'
          isDisabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          上一頁
        </Button>
        <Button
          size='sm'
          mx={5}
          onClick={() => setPage(page + 1)}
        >
          下一頁
        </Button>
      </Box>
    </Box>
  )
}

export default Section
