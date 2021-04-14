import { Container } from 'components/Container'
import HeadTop from 'components/common/headTop'
import ContainPage from 'components/containPage'
import PageHeader from 'components/layout/pageHeader'

const WordHead = ({ title, children, props }) => {
  return (
    <Container height='auto' {...props}>
      <PageHeader />
      <ContainPage>
        <HeadTop title={title} />
        {children}
      </ContainPage>
    </Container>
  )
}

export default WordHead
