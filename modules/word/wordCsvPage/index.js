import WordHead from 'components/header/wordHead'
import SectionCsv from './sectionCsv'

import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import WordNav from '../wordNav'

const WordCsvPage = () => {
  return (
    <Container>
      <ContainPage>
        {/* 导航栏 */}
        <WordNav />
        {/* 头部 */}
        <HeadTop title='单词汇入' />
        {/* 主体 */}
        <SectionCsv />
      </ContainPage>
    </Container>
  )
}

export default WordCsvPage
