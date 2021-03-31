import {
    Box,
    Heading,
    Text,
    Flex
} from '@chakra-ui/react'
import { DarkModeSwitch } from 'components/DarkModeSwitch'

const HeadTop=({title})=>{
    return(
        <Flex h={20} align='center' justify='center'>
            <Heading fontSize="xl">{title}</Heading>
            <DarkModeSwitch />
        </Flex>
    )
}

export default HeadTop