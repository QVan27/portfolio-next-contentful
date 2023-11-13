import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import gsap from 'gsap'
import { useLenis } from '@studio-freight/react-lenis'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { AiOutlineArrowUp } from 'react-icons/ai'

const Container = styled.div`
  position: fixed;
  z-index: calc(var(--z-networks) + 2);
  bottom: 15vh;
  left: 0;
`

const Area = styled.div`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
`

const Button = styled.button`
  position: relative;
  border-radius: 50%;
  border: 0.1rem solid var(--paragraph);
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  cursor: pointer;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    color: var(--main);
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-out;
  }

  & > div:nth-child(1) { transform: translate(-50%, 200%); }

  @media screen and (hover: hover) {
    &:hover {
      & > div:nth-child(1) { transform: translate(-50%, -50%); }
      & > div:nth-child(2) { transform: translate(-50%, -250%); }
    }
  }
`

export default function ScrollTopButton() {
  const lenis = useLenis(ScrollTrigger.update)
  const container = useRef(null)
  const area = useRef(null)
  const button = useRef(null)

  const animateScrollTopButton = () => {
    gsap.fromTo(
      container.current,
      {
        opacity: 0,
        pointerEvents: 'none',
      },
      {
        opacity: 1,
        pointerEvents: 'all',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    )

    gsap.fromTo(
      button.current,
      {
        scale: 0,
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    )
  }

  const parallaxIt = (e, target, movement) => {
    const boundingRect = area.current.getBoundingClientRect()
    const relX = e.pageX - boundingRect.left
    const relY = e.pageY - boundingRect.top
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    gsap.to(target.current, {
      x: (relX - boundingRect.width / 2) * movement,
      y: (relY - boundingRect.height / 2 - scrollTop) * movement,
      ease: 'power4.out',
      duration: 0.5,
    })
  }

  const callParallax = (e) => {
    button.current && parallaxIt(e, button, 0.8)
  }

  const resetParallax = () => {
    button.current && resetParallaxTween(button)
  }

  const resetParallaxTween = (ref) => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'back',
    })
  }

  useEffect(() => {
    ScrollTrigger.refresh()

    animateScrollTopButton()

    area.current.addEventListener('mousemove', callParallax)
    area.current.addEventListener('mouseleave', resetParallax)

    button.current.addEventListener('click', () => {
      if (lenis && lenis.scrollTo) lenis.scrollTo(0)
      else console.error('lenis or lenis.scrollTo is undefined')
    })
  }, [lenis])

  return (
    <Container
      ref={container}
      className='hidden md:w-full md:grid md:grid-cols-24 gap-x-2.5'
    >
      <div className='flex justify-center items-end md:col-start-22 md:col-end-23'>
        <Area ref={area}>
          <Button ref={button}>
            <div>
              <AiOutlineArrowUp />
            </div>
            <div>
              <AiOutlineArrowUp />
            </div>
          </Button>
        </Area>
      </div>
    </Container>
  )
}
