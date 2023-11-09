import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton } from 'next/font/google'
import gsap from 'gsap'
import { useLenis } from '@studio-freight/react-lenis'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const animationDuration = 3.5
const fadeOutDuration = 0.25
const barAnimationDuration = 1.5

const Counter = styled.span`
  display: flex;
  position: fixed;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: calc(var(--z-loader) + 1);
  padding: 1rem;
  width: 100%;
  height: 100%;
  color: var(--paragraph);
  font-size: 20vw;
  opacity: 1;
  transition: opacity ${fadeOutDuration}s ease-out;
`

const Overlay = styled.div`
  display: flex;
  position: fixed;
  z-index: var(--z-loader);
  width: 100vw;
  height: 100vh;

  .bar {
    background-color: var(--secondary-background);
    width: 10vw;
    height: 105vh;
  }
`

export default function Loader() {
  const counterRef = useRef(null)
  const overlayRef = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const counterElement = counterRef.current

    const animation = gsap.to(counterElement, {
      duration: animationDuration,
      innerHTML: 100,
      ease: 'power2.inOut',
      onStart: () => {
        lenis && lenis.stop()
        counterElement.innerHTML = 0
      },
      onUpdate: () => {
        counterElement.innerHTML = Math.round(
          parseFloat(counterElement.innerHTML)
        )
      },
    })

    animation.eventCallback('onComplete', () => {
      const tl = gsap.timeline({
        onComplete: () => {
          counterRef.current.remove()
          overlayRef.current.remove()
          lenis && lenis.start()
        },
      })

      tl.to('.counter', {
        duration: fadeOutDuration,
        opacity: 0,
        ease: 'linear',
      })

      tl.to('.bar', {
        duration: barAnimationDuration,
        height: 0,
        ease: 'power4.inOut',
        stagger: 0.1,
      })
    })

    return () => {
      animation.kill()
    }
  }, [lenis])

  return (
    <>
      <Counter ref={counterRef} className={`${anton.className} counter`} />
      <Overlay ref={overlayRef} className='overlay'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='bar'></div>
        ))}
      </Overlay>
    </>
  )
}
