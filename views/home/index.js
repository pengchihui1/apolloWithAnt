import {
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  HStack,
  Heading
} from '@chakra-ui/react'
import Router from 'next/router'

import WordHead from 'components/header/wordHead'
import Caserl from 'components/common/caserl'

const Index = () => {
  const modules = [
    { title: '单词游戏', desc: '大陆三年级至高三，用于互动挑战记单词，短句的乐趣！', url: '/home/word' },
    { title: '装饰材料系统', desc: '打怪开始,先从用户管理开始', url: '' },
    { title: '市场分析区块链系统', desc: '打怪开始,先从用户管理开始', url: '' },
    { title: '地图与支付接口', desc: '打怪开始,先从用户管理开始', url: '' }
  ]

  return (
    <WordHead title='单词汇入'>
      <HStack spacing={8} align='flex-start'>
        {modules.map((module, index) => {
          return (
            <Caserl
              className='casecursor'
              title={module.title}
              desc={module.desc}
              key={index}
              onClick={() => {
                Router.push(module.url)
              }}
            />
          )
        })}
      </HStack>
      <style>
        {`
            .casecursor{cursor:pointer;}
        `}
      </style>
    </WordHead>
  )
}

export default Index
