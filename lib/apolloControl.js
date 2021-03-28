import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'apollo/client'

const ApolloControl = ({ pageProps }) => {
    const apolloClient = useApollo(pageProps.initialApolloState)
    return <ApolloProvider client={apolloClient} />
}

export default ApolloControl