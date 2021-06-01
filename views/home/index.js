import {
  Grid,
  Box,
  Text,
  Header
} from '@chakra-ui/react'
import Router from 'next/router'

import WordHead from 'components/header/wordHead'

import { modules } from './module'

const Index = () => {
  return (
    <WordHead title='系统'>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {modules.map((item, index) => {
          return (
            <Box
              w='100%'
              p={4}
              key={index}
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
            >
              <Header>{item.moduleName}</Header>
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
