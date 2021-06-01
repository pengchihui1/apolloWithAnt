import {
  Box,
  Text,
  Flex,
  Button,
  Spinner
} from '@chakra-ui/react'
import { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { getWordStatisticQuery } from 'shared/graphql/queries/wordStatistic/getWordStatistic'

const ErrorList = () => {
  const [page, setPage] = useState(1)
  const { data, loading, error } = useQuery(getWordStatisticQuery, {
    variables: {
      first: 10,
      after: (page - 1) * 10,
      filter: {
        status: false
      }
    }
  })
  if (error) {
    console.log(error)
    return null
  }

  let getWordStatistic = {}
  let pageInfo = null
  let node = []
  if (data) {
    getWordStatistic = data.getWordStatistic
    pageInfo = getWordStatistic.pageInfo
    node = getWordStatistic.edges.map(item => item.node)
  }

  return (
    <Box mt={10} maxH='400px' minW='200px' border='1px solid #CBD5E0' borderRadius='10px' p={6}>
      <Text textAlign='center' mb={2}>错误排行榜</Text>
      {/* 数据加载中 */}
      {loading && !error && !data && (
        <Box textAlign='center' py={5}>
          <Spinner />
        </Box>
      )}
      {/* 无数据 */}
      {!loading && !error && !node.length && (
        <Box textAlign='center' py={5}>
          无数据
        </Box>
      )}
      {node.map(item => {
        return (
          <Flex justify='space-between' key={item.word_id}>
            <Text>{item?.word?.word}</Text>
            <Text>{parseInt(item?.number)}次</Text>
          </Flex>
        )
      })}
      {/* 翻頁 */}
      <Box mb={10} d='flex' justifyContent='center' mt={4}>
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
    </Box>
  )
}
export default ErrorList
