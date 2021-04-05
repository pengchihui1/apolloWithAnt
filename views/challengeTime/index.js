import {
    Box,
    Text,
    Flex,
    Button,
    IconButton,
    Icon
}from '@chakra-ui/react'

import {
    EmailIcon,
    PhoneIcon,
    SearchIcon,
    EditIcon
}from '@chakra-ui/icons'

import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell
}from 'components/table'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'

const ChallengeTime=()=>{

    return (
    <Container height="100vh">
        <ContainPage>
        {/* 头部 */}
        <HeadTop title="挑战时间设置"/>
        {/* 添加按鈕 */}
        <Flex><Button colorScheme="twitter">添加</Button></Flex>
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
                <TableRow>
                    <TableCell>2021-03-04</TableCell>
                    <TableCell>2021-03-21</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                    <IconButton
                        colorScheme="blue"
                        icon={<EditIcon />}
                        size='sm'
                        my={2}
                        onClick={() => {  }}
                    />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </ContainPage>
    </Container>
    )
}

export default ChallengeTime