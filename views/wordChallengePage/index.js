import {
  Box
} from '@chakra-ui/react'

import SectionChallenge from './sectionChallenge'
import WordHead from 'components/header/wordHead'

const WordChallengePage = () => {
  return (
    <WordHead title='单词挑战'>
        {/* 主体 */}
        <SectionChallenge />
      </WordHead>
  )
}

export default WordChallengePage
