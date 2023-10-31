import React, { useEffect } from 'react'
import Router from 'next/router'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

export default function Scroll({ children }) {
  const lenis = useLenis()

  useEffect(() => {
    const onHashChangeStart = (url) => {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
