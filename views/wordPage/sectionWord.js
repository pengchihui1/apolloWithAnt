import {
Box,
Text,
Input,
Button,
Flex
}from '@chakra-ui/react'

import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
}from 'components/table'

const SectionWord=()=>{
    return (
     <Box>
        {/* 新单词推存 */}
        <Flex justify='flex-start' mb={2}><Button isLoading={false} colorScheme="twitter" size='sm' >换一批</Button></Flex>
        <Flex justify='space-around' border='1px solid #CBD5E0' p={2} borderRadius='10px' mt={2}> 
            <Button>Name</Button>
            <Button>Age</Button>
            <Button>blessing</Button>
            <Button>encourage</Button>
        </Flex>
       
        {/* 搜索 */}
        <Box d='flex' w={{ base: '100%', md: '700px' }} mx='auto' mt={4}>
            <Input
            marginLeft='0'
            placeholder='日期、单词、翻译、读音'
            onChange={()=>{}}
            />
            <Button
                colorScheme="blue"
                minW={{ base: 70, md: 100 }}
                fontSize={{ base: '14px', md: '16px' }}
                ml={2}
                isDisabled={false}
                onClick={() => {}}
            >
              搜索
         </Button>
      </Box>
        {/* 表格 */}
        <Table my={6} textAlign='center'>
            <TableHead>
                <TableRow>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                </TableRow>
                </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                    <TableCell>345</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      

        {/* 翻页 */}
       <Box my={2} d='flex' justifyContent='center'>
            <Button
                size='sm'
                mx={5}
                colorScheme='blue'
                // onClick={() => setPage(1)}
            >
            第一頁
            </Button>
            <Button
                size='sm'
                mx={5}
                colorScheme='cyan'
                // isDisabled={page === 1}
                // onClick={() => setPage(page - 1)}
            >
                上一頁
            </Button>
            <Button
                size='sm'
                mx={5}
                colorScheme='teal'
                // isDisabled={!pageInfo.hasNextPage}
                // onClick={() => setPage(page + 1)}
            >
                下一頁
            </Button>
       </Box>
      
       </Box>
  
    )
}

export default SectionWord