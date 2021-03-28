import {
  Box
} from '@chakra-ui/react'

const Page = ({ urls, children, ...props }) => {
  return (
    <Box
      as='main'
      w={{ base: '100%', md: '90%' }}
      mt='2px'
      mx='auto'
      bg='white'
      minH='calc(100vh - 60px)'
      maxWidth='928px'
      borderRadius='4px 4px 0 0'
      position='relative'
      px={{ base: 0, md: 20 }}
      transition='0.3s'
      boxShadow={{
        base: '',
        sm: '',
        md: '0 -1px 10px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1), 0 10px 30px #f3ece8'
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Page
