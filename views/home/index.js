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
import Container1280 from 'components/common/containerCenter'
import { Header,HeaderCenter} from 'components/Header'

import Router from 'next/router'
   
const Index = () => {
    const modules=[
        {title:'单词游戏',desc:'大陆三年级至高三，用于互动挑战记单词，短句的乐趣！',url:'/home/recoding'},
        {title:'装饰材料系统',desc:'打怪开始,先从用户管理开始',url:''},
        {title:'市场分析区块链系统',desc:'打怪开始,先从用户管理开始',url:''},
        {title:'地图与支付接口',desc:'打怪开始,先从用户管理开始',url:''},
    ]
    return(
    <Container height="100vh">
        <Container1280>
            <HeadTop title='个人升级'/>
            <HStack spacing={8} align='flex-start'>
                {modules.map((module,index)=>{
                    return  <Caserl 
                    className='casecursor'
                     title={module.title} 
                     desc={module.desc}
                      key={index} 
                      onClick={()=>{
                        Router.push(module.url)
                      }}
                    />
                })}
            </HStack>
        </Container1280>
        <style>
            {`
                .casecursor{cursor:pointer;}
            `}
        </style>
    </Container>
    )
}

export default Index