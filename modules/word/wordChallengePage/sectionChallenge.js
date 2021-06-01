import {
  Box,
  Flex,
  Button,
  Text,
  Select,
  Grid,
  Input
} from '@chakra-ui/react'

import { useState } from 'react'

// import Verification from './verification'

import DatePicker from 'react-datepicker'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { getWordsFilterQuery } from 'shared/graphql/queries/word/getWord'
import { createWordStatisticMutation } from 'shared/graphql/mutations/wordStatistic/createWordStatistic'
import { getWordStatisticQuery } from 'shared/graphql/queries/wordStatistic/getWordStatistic'

const SectionChallenge = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // 翻页
  const [page, setPage] = useState(1)
  // 日期
  const [timeAt, setTimeAt] = useState(new Date())

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
        endAt: endAt.toISOString()
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

  // 原来值
  const [oldWord, setOldWord] = useState(node.map(item => item))
  // 对照值
  const [newWord, setNewWord] = useState(node.map(item => item.word).map(item => { item = ''; return item }))

  // 控制是否记录了成绩
  const [recording, setRecording] = useState(false)

  // 创建统计
  const [createWordStatistic] = useMutation(createWordStatisticMutation)

  return (
    <Box>
      <>
        {/*  计时头部  日期切换 */}
        <Flex justify='space-around' align='center'>
          <Button>开始计时</Button>
          <Box border='1px solid #CBD5E0' width='100px' textAlign='center' className='distributed'>10:50</Box>
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
        </Flex>
        {/* 输入单词 */}
        <Flex justify='center' align='center' mt={4}>
          <Grid templateColumns={node?.length <= 5 ? `repeat(${node?.length},1fr)` : 'repeat(5, 1fr)'} gap={6} textAlign='center'>
            {node?.map((item, index) => {
              return (
                <Box border='1px solid #CBD5E0' p={2} key={index}>
                  <Text>{item.translation}</Text>
                  <Input
                    placeholder='single word'
                    size='sm'
                    onInput={(e) => {
                      newWord[index] = e.target.value
                      setNewWord(newWord)
                    }}
                  />
                </Box>
              )
            })}
          </Grid>
        </Flex>
        {/* 翻頁 */}
        <Box my={5} d='flex' justifyContent='center'>
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
            isDisabled={page === 1 && !recording}
            onClick={() => setPage(page - 1)}
          >
            上一頁
          </Button>
          <Button
            size='sm'
            mx={5}
            isDisabled={!pageInfo?.hasNextPage && !recording}
            onClick={() => {
              setRecording(false)
              setPage(page + 1)
            }}
          >
            下一頁
          </Button>
        </Box>
        {/* 记录成绩 */}
        <Box>
          {/* 评分  */}
          <Flex p={2} mt={4} justify='center'>
            <Button mr={4}
              onClick={() => {
                setRecording(true)
                setOldWord(node.map(item => item))
              }}
            >
              评分
            </Button>
            <Button onClick={() => {
              oldWord?.forEach((element, index) => {
                console.log(element.id, element.word === newWord[index])
                createWordStatistic({
                  variables: {
                    input: {
                      word_id: element.id,
                      status: element.word === newWord[index]
                    }
                  }, refetchQueries: [{
                    query: getWordStatisticQuery,
                    variables: { first: 10, after: 0, filter: { status: false } }
                  }]
                })
              })
            }}
            >
              提交成绩
            </Button>
          </Flex>
          {/* 验证正确性 */}
          <Box>
            {oldWord?.map((item, index) => {
              return (
                <Text key={item.id}>
                  <span className='pRight' color='red'>{item.translation}</span>
                  <span className='pRight'>单词为：{item.word}</span>
                  <span>{item.word === newWord[index] ? `正确答案为：${item.word}` : `错误答案为：${newWord[index] || null}`}</span>
                </Text>
              )
            })}
          </Box>
        </Box>
      </>
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
          .pRight{
             padding-right:10px
          }
      `}
      </style>
    </Box>
  )
}

export default SectionChallenge
