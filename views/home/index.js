import {
    Link as ChakraLink,
    Text,
    Code,
    List,
    ListIcon,
    ListItem,
    HStack,
    Heading
} from '@chakra-ui/react'
import { Container } from 'components/Container'

import HeadTop from 'components/common/headTop'
import Caserl from 'components/common/caserl'
import Container1280 from 'components/common/container1280'
import { Header,HeaderCenter} from 'components/Header'
   
const Index = () => {
    return(
    <Container height="100vh">
        <Container1280>
            <HeadTop title='个人升级'/>
            <HStack spacing={8}>
                <Caserl title='个人魔族' desc='打怪开始,先从用户管理开始' />
                <Caserl title='个人习性' desc='打怪开始,先从用户管理开始' />
                <Caserl title='个人图书馆' desc='打怪开始,先从用户管理开始' />
            </HStack>
        </Container1280>
    </Container>
    )
}

export default Index