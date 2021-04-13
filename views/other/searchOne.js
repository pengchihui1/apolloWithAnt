import {
  Box
} from '@chakra-ui/react'

const SearchTest = () => {
  return (
    <Box d='flex' w={{ base: '100%', md: '700px' }} mx='auto'>
      <Input
        data-cy='input-search-leave-schooluser-name'
        placeholder={identityType === 'student' ? '學生姓名、班級、學號' : '老師姓名'}
        defaultValue={search}
        onChange={(e) => { searchInput.current = e.target.value }}
      />
      <IconButton
        data-cy='btn-icon-search-leave'
        aria-label='Search database'
        variantColor='blue'
        icon='search'
        ml={4}
        onClick={() => {
          let attachedUrl = ''
          if (page) {
            page = 1
            attachedUrl = `/leave?page=${page}`
          }

          if (searchInput.current) {
            attachedUrl += `${attachedUrl.length ? '&' : '?'}search=${searchInput.current}`
          }

          if (!useFilter && !!startDate && !!endDate) {
            if (startDate.toISOString() > endDate.toISOString()) {
              ToastMessage({
                title: '過濾請假記錄錯誤',
                message: '開始時間應該早於結束時間！',
                toast
              })
              return null
            }
            attachedUrl += `${attachedUrl.length ? '&' : '?'}startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
          }

          router.push(
              `/school/[schoolId]/attendance${attachedUrl}`,
              `/school/${schoolId}/attendance${attachedUrl}`
          )
        }}
      />
    </Box>
  )
}

export default SearchTest
