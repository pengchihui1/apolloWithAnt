import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

class Index extends React.Component {
  static getInitialProps({ req, res }) {
    if (typeof window === 'undefined' && !res.writeHead) {
      const host = req.headers['x-forwarded-host'] || req.headers.host
      if (host === 'localhost:3000') {
        return { metaRedirect: '/home' }
      } else {
        return { metaRedirect: '/home' }
      }
    }

    if (req) {
      const host = req.headers['x-forwarded-host'] || req.headers.host
      if (host === 'localhost:3000') {
        res.writeHead(302, { Location: '/home' })
        res.end()
      } else {
        res.writeHead(302, { Location: '/home' })
        res.end()
      }
    } else {
      const host = window.location.host
      if (host === 'localhost:3000') {
        Router.push('/home')
      } else {
        Router.push('/home')
      }
    }
    return {}
  }

  render() {
    if (this.props.metaRedirect) {
      return (
        <Head>
          <meta httpEquiv='refresh' content={`0; url=${this.props.metaRedirect}`} />
        </Head>
      )
    }
    return null
  }
}

export default Index
