import SectionChallenge from './sectionChallenge'
import WordHead from 'components/header/wordHead'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import WordNav from '../wordNav'

const WordChallengePage = () => {
  return (
    <Container height='100vh'>
      <ContainPage>
        {/* 导航栏 */}
        <WordNav />
        {/* 头部 */}
        <HeadTop title='单词挑战' />
        {/* 主体 */}
        <SectionChallenge />
      </ContainPage>
    </Container>
    // <WordHead title='单词挑战'>
    //   {/* 主体 */}
    //   <SectionChallenge />
    // </WordHead>
  )
}

export default WordChallengePage
