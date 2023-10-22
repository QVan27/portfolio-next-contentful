import React, { useEffect } from 'react'
import Router from 'next/router'
import { Lenis, useLenis } from '@studio-freight/react-lenis'
import Grid from '@/components/Grid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

const Wrapper = ({ children }) => {
  // more information about lenis with react https://codesandbox.io/p/sandbox/old-snowflake-q3x4x5?file=%2Fapp%2Flayout.tsx%3A11%2C3
  const lenis = useLenis()

  useEffect(() => {
    function onHashChangeStart(url) {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  return (
    <>
      <Grid />
      <Loader />
      <Lenis root>
        <Header />
        <main>
          <div>{children}</div>
        </main>
        <Footer />
      </Lenis>
    </>
  )
}

export default Wrapper