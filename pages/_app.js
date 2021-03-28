
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Router from 'next/router'
import theme from './theme'

import ApolloControl from 'lib/apolloControl'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp

//目录
initRouterListeners()

const ROUTES_TO_RETAIN = ['/home/[pengId]']

function initRouterListeners() {
  if (typeof window === 'undefined' || window.__initializedRouterListeners) return
  window.__initializedRouterListeners = true

  // console.log('Init router listeners')

  const routes = []

  Router.events.on('routeChangeStart', (url) => {
    routes[Router.pathname] = window.scrollY
  })

  Router.events.on('routeChangeComplete', (url) => {
    if (ROUTES_TO_RETAIN.includes(Router.pathname)) {
      const scrollY = routes[Router.pathname] || 0
      // console.log('Scrolling to', scrollY)
      window.requestAnimationFrame(() => window.scrollTo(0, scrollY))
      // console.log('routes now:', routes)
    }
  })
}
