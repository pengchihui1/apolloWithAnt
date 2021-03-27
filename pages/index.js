
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { getViewerQuery} from 'shared/graphql/queries/user/getUser'


export async function getStaticProps () {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: getViewerQuery
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}
const Index = () => {

  const { data:{viewer} } = useQuery(getViewerQuery)
  
  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
      <Link href='/about'>
        <a>static</a>
      </Link>{' '}
      page.
    </div>
  )
}



export default Index
