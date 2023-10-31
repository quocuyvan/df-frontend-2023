import '../styles/index.css'
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { AuthContextProvider } from 'context/auth'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // eslint-disable-next-line global-require
  require('mocks')
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Chess with GPT</title>
          <meta content="Chess with GPT" property="og:title" />
          <meta content="@dwarvesf" name="twitter:site" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="Play western chess with chatGPT." name="description" />
          <meta
            content="Play western chess with chatGPT."
            property="og:description"
          />
          <meta content="/thumbnail.jpeg" property="og:image" />
          <meta content="/thumbnail.jpeg" name="twitter:image" />
        </Head>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </>
    )
  }
}
export default MyApp
