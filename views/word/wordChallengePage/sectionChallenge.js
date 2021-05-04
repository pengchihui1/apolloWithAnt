import {
  Box,
  Flex,
  Button,
  Text,
  Select,
  Grid,
  Input
} from '@chakra-ui/react'

const SectionChallenge = () => {
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <Box>
      {/* 计时头部 */}
      <Flex justify='space-around' align='center'>
        <Button>开始计时</Button>
        <Box border='1px solid #CBD5E0' width='100px' textAlign='center' className='distributed'>10:50</Box>
        <Select maxW='160px'>
          <option>2021-04-03</option>
          <option>2021-04-04</option>
          <option>2021-04-05</option>
          <option>2021-04-06</option>
        </Select>
      </Flex>
      {/* 填写主体 */}
      <Box my={4} />
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        {number.map((item, index) => {
          return (
            <Box border='1px solid #CBD5E0' p={2} key={index}>
              <Text>某人，有人</Text>
              <Input placeholder='single word' size='sm' />
            </Box>
          )
        })}
      </Grid>
      {/* 提交验证  */}
      <Flex p={2} justify='center'>
        <Button mr={2}>评分</Button>
        <Button>记录成绩</Button>
      </Flex>
      {/* 验证正确性 */}
      <Box>
        <Text><span>某人，有人</span><span>正确答案为：SomeOne</span><span>错误是：OnePeople</span></Text>
        <Text><span>某人，有人</span><span>正确答案为：SomeOne</span><span>错误是：OnePeople</span></Text>
      </Box>
    </Box>
  )
}

export default SectionChallenge
