import {
  Grid,
  Box,
  Text,
  Heading
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import WordHead from 'components/header/wordHead'

import { modules } from './module'

const Index = () => {
  const router = useRouter()
  return (
    <WordHead title='系统'>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {!!modules && modules?.map((item, index) => {
          return (
            <Box
              key={index}
              w='100%'
              p={4}
              textAlign='center'
              cursor='pointer'
              borderWidth='1px'
              borderRadius='md'
              boxShadow='md'
              _checked={{
                bg: 'teal.600',
                color: 'white',
                borderColor: 'teal.600'
              }}
              _focus={{
                boxShadow: 'outline'
              }}
              onClick={() => { router.push(item.url) }}
            >
              <Heading as='h4' size='md' letterSpacing='-.1rem'>{item.moduleName}</Heading>
              <Text>{item.desc}</Text>
            </Box>
          )
        })}
      </Grid>
      <style>
        {`
          .casecursor{cursor:pointer;}
        `}
      </style>
    </WordHead>
  )
}

export default Index
