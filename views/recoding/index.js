import{
    Box,
    Flex
}from '@chakra-ui/react'

import {Container}  from 'components/Container'
import Page from 'components/page'
import {
    Fieldset,
    LeftFieldset,
    RightFieldset,
    FieldsetHeader
}from 'components/fieldset'

const Recoding=()=>{
    return (
        <Container>
            <Page>
                <Fieldset>
                   <FieldsetHeader>闯关单词</FieldsetHeader>
                </Fieldset>
              <Flex>
              </Flex>
            </Page>
        </Container>
        
    )
}

export default Recoding