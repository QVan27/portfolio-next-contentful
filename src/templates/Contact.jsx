import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styled from 'styled-components'
import Link from 'next/link'
import { FaLocationArrow } from 'react-icons/fa'
import { Anton, Maitree, Nunito_Sans } from 'next/font/google'
import { Atropos } from 'atropos/react'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const maitree = Maitree({
  weight: ['300'],
  subsets: ['latin'],
})

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin'],
})

const Section = styled.section`
  position: relative;

  .atropos {
    height: 80%;
    width: 100%;
  }
`

const Container = styled.div`
  display: grid;
  position: relative;
  place-items: center;
  overflow: hidden;
  background-color: var(--secondary-background);
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--paragraph);
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  gap: 2.5rem;

  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    color: var(--main);

    span:nth-child(2) {
      font-size: 4rem;
      text-transform: uppercase;
      letter-spacing: 0.32rem;
      line-height: 1;

      @media screen and (min-width: 768px) {
        font-size: 6rem;
      }

      @media screen and (min-width: 1024px) {
        font-size: 8rem;
      }
    }
  }
`

const Area = styled.div`
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;

  .button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    color: var(--main);

    @media screen and (hover: hover) {
      &:hover {
        .button__text {
          display: none;
        }

        .button__icon {
          display: block;
        }
      }
    }

    &__circle {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 0.5px solid var(--main);
    }

    &__text {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.12rem;
      line-height: 1;

      p:nth-child(2) {
        margin-left: 0.5rem;
      }
    }

    &__icon {
      display: none;
      font-size: 1.5rem;
    }
  }
`

export default function Contact() {
  const area = useRef(null)
  const button = useRef(null)
  const icon = useRef(null)
  const circle = useRef(null)
  const circle1 = useRef(null)
  const circle2 = useRef(null)

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
    if (button.current) parallaxIt(e, button, 0.5)
    if (icon.current) parallaxIt(e, icon, 0.05)
    if (circle.current) parallaxIt(e, circle, 0.01)
    if (circle1.current) parallaxIt(e, circle1, 0.1)
    if (circle2.current) parallaxIt(e, circle2, 0.2)
  }

  const resetParallax = () => {
    [button, icon, circle, circle1, circle2].forEach((ref) => {
      if (ref.current) resetParallaxTween(ref)
    })
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
    area.current.addEventListener('mousemove', callParallax)
    area.current.addEventListener('mouseleave', resetParallax)
  }, [])

  return (
    <Section id='contact'>
      <div className='min-h-screen grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='min-h-full col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex items-center'>
          <Atropos
            className='atropos'
            activeOffset={25}
            shadow={false}
            rotateTouch={false}
          >
            <Container>
              <Content className='content'>
                <h2>
                  <span className={`${maitree.className}`}>
                    Got a project in mind ?
                  </span>
                  <span
                    className={`${anton.className}`}
                    data-atropos-offset='5'
                  >
                    let&apos;s connect
                  </span>
                </h2>
                <Area ref={area}>
                  <Link
                    ref={button}
                    className='button'
                    href='mailto:qvannarathdev@gmail.com'
                  >
                    <div className='button__circle' ref={circle}></div>
                    <div className='button__circle' ref={circle1}></div>
                    <div className='button__circle' ref={circle2}></div>
                    <div className={`${nunitoSans.className} button__text`}>
                      <p>write a</p>
                      <p>message</p>
                    </div>
                    <div className='button__icon' ref={icon}>
                      <FaLocationArrow />
                    </div>
                  </Link>
                </Area>
              </Content>
            </Container>
          </Atropos>
        </div>
      </div>
    </Section>
  )
}
