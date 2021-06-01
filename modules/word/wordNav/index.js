import {
  Flex,
  Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const WordNav = () => {
  const router = useRouter()
  const url = [
    { name: '单词系统', url: '/home/word', as: '/home/word' },
    { name: '单词挑战', url: '/home/word/challenge', as: '/home/word/challenge' },
    { name: 'csv汇入', url: '/home/word/csv', as: '/home/word/csv' },
    { name: '挑战时间', url: '/home/word/challengeTime', as: '/home/word/challengeTime' },
    { name: '线上翻译', url: '/home/word/translation', as: '/home/word/translation' }
  ]

  return (
    <Flex mt={10} justify='space-around'>
      {url.map((item, index) => {
        return (
          <Button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              router.push(item.url)
            }}
          >
            {item.name}
          </Button>
        )
      })}
    </Flex>
  )
}

export default WordNav
