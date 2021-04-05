import {
    Box
}from '@chakra-ui/react'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'

const WordHead=({title ,children, props})=>{

    return(
        <Container height="auto" {...props}>
            <ContainPage>
                {/* 头部 */}
                <HeadTop title={title}/>
                {/* 主体 */}
                {children}
            </ContainPage>
        </Container>
    )
}

export default WordHead