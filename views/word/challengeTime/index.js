
import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import WordNav from '../wordNav'

import Seciton from './section'
const ChallengeTime = () => {
  return (
    <Container height='100vh'>
      <ContainPage>
        {/* 导航栏 */}
        <WordNav />
        {/* 头部 */}
        <HeadTop title='挑战时间设置' />
        {/* 主体 */}
        <Seciton />
      </ContainPage>
    </Container>
  )
}

export default ChallengeTime
