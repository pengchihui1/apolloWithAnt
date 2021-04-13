import {
  Box
} from '@chakra-ui/react'

const SearchTest = () => {
  return (
    <Box d='flex' w={{ base: '100%', md: '700px' }} mx='auto' mt={4}>
      <Input
        marginLeft='0'
        placeholder='活動名稱、專長'
        onChange={
            e => setFilter({
              title: e.target.value,
              schoolId
            })
          }
      />
      <Button
        variantColor='blue'
        minW={{ base: 70, md: 100 }}
        fontSize={{ base: '14px', md: '16px' }}
        ml={2}
        isDisabled={!(filter && filter.title)}
        onClick={() => {
          // 如果沒有搜索內容點擊後就不在搜索了
          if (filter.title) {
            getPosts({ variables: { first: 10, filter } })
          }
        }}
      >
        搜索
      </Button>
    </Box>
  )
}

export default SearchTest
