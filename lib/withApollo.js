import React, { useState, useEffect } from 'react'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks' // 连接Apollo客户端到React
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
// import { HttpLink } from 'apollo-link-http'
// cnpm install apollo-link @apollo/react-hooks apollo-cache-inmemory apollo-client
import { BatchHttpLink as HttpLink } from 'apollo-link-batch-http'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import { getMaintenanceMode } from 'lib/maintenanceMode'

let globalApolloClient = null

// PageComponent myapp
export default function withApollo (PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    // 一开始为 disabled，否则 SSG 会产生维护的 html
    const [maintenanceMode, setMaintenanceMode] = useState('disabled')

    // 所以载入完 dom 后再 check 一次
    useEffect(() => {
      if (maintenanceMode !== 'enabled') {
        const mode = getMaintenanceMode()
        if (mode === 'enabled') {
          setMaintenanceMode('enabled')
        }
      }
    }, [maintenanceMode])

    let client
    if (apolloClient) {
      client = apolloClient
    } else {
      client = initApolloClient(apolloState, { setMaintenanceMode })
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent maintenanceMode={maintenanceMode} {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  // if (process.env.NODE_ENV !== 'production') {
  //   const displayName =
  //     PageComponent.displayName || PageComponent.name || 'Component'
  //   WithApollo.displayName = `withApollo(${displayName})`
  // }

  return WithApollo
}

function initApolloClient (initialState, ctx) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx)
  }

  return globalApolloClient
}

// 例化Apollo客户端
function createApolloClient (initialState = {}, ctx) {
  const ssrMode = typeof window === 'undefined'
  const cache = new InMemoryCache().restore(initialState)

  return new ApolloClient({
    // connectToDevTools: typeof window !== 'undefined',
    ssrMode,
    link: createIsomorphLink(ctx),
    cache
  })
}

function createIsomorphLink (ctx) {
  let cookie = ''

  // 拿出 app 存在 window 里的数据
  if (typeof window !== 'undefined' && window.session && window.sessionSig) {
    cookie = `session=${window.session};session.sig=${window.sessionSig};`
  }

  // 把 cookie 放在请求头部里
  const authLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        session: cookie
      }
    }
  })

  let link

  if (typeof window === 'undefined') {
    link = new ApolloLink((operation, forward) => {
      return null
    })
  } else {
    link = new HttpLink({
      uri: '/api/graphql',
      credentials: 'include',
      fetch
    })
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors && graphQLErrors.length) {
      for (const err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'MAINTENANCE':
            if (ctx.setMaintenanceMode) {
              ctx.setMaintenanceMode('enabled')
            }
            break
          default:
            // console.log(err)
        }
      }
    }
  })

  return ApolloLink.from([errorLink, authLink, link])
}
