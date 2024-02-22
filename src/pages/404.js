import React, { useEffect, useRef } from 'react'
import { client } from '@/lib/contentful'
import Header from '@/components/Header'
import Footer from '@/templates/Footer'
import HeadData from '@/components/HeadData'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import { Anton, Nunito_Sans } from 'next/font/google'
import { Atropos } from 'atropos/react'
import gsap from 'gsap'
import styled from 'styled-components'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin'],
})

const Section = styled.section`
  position: relative;
  padding-top: 3rem;

  .atropos {
    z-index: calc(var(--z-networks) + 1);
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

  h1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    color: var(--main);
    width: 90%;
    font-size: calc(4rem + (80 - 40) * ((100vw - 320px) / (1024 - 320)));
    text-transform: uppercase;
    letter-spacing: 0.32rem;
    line-height: 1;
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

export default function Custom404({ footer }) {
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

  const parallaxRefs = [button, icon, circle, circle1, circle2]

  const resetParallax = () => {
    parallaxRefs.forEach((ref) => {
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
  })

  return (
    <>
      <HeadData />
      <Header />
      <main>
        <Section>
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
                    <h1 className={`${anton.className}`}
                      data-atropos-offset='5'>
                      404 - Page not found
                    </h1>
                    <Area ref={area}>
                      <Link
                        ref={button}
                        className='button'
                        href='/'
                        aria-label='Go to home'
                      >
                        <div className='button__circle' ref={circle}></div>
                        <div className='button__circle' ref={circle1}></div>
                        <div className='button__circle' ref={circle2}></div>
                        <div className={`${nunitoSans.className} button__text`}>
                          <p>Go to</p>
                          <p>Home</p>
                        </div>
                        <div className='button__icon' ref={icon}>
                          <FaHome />
                        </div>
                      </Link>
                    </Area>
                  </Content>
                </Container>
              </Atropos>
            </div>
          </div>
        </Section>
      </main>
      <Footer data={footer[0].fields} />
    </>
  )
}

export const getStaticProps = async () => {
  const footer = await client.getEntries({ content_type: 'footer' })

  return {
    props: {
      footer: footer.items,
    },
    revalidate: 3600
  }
}