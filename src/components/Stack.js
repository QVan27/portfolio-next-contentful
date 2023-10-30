import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton, Nunito_Sans } from 'next/font/google'
import SmallTitle from './SmallTitle'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const anton = Anton({
  weight: ['400'],
  subsets: ['latin']
})

const nunitoSans = Nunito_Sans({
  weight: ['600'],
  subsets: ['latin']
})

const Section = styled.section`
  position: relative;
  z-index: calc(var(--z-networks) + 1);
  padding: 6.25rem 0rem;
  background-color: var(--primary-background);
`

const List = styled.ul`
  margin-top: 1.25rem;

  li {
    display: grid;

    @media screen and (hover: hover) {
      position: relative;

      div { pointer-events: none; }

      &:hover {
        .background { height: 100%; }

        h3 { color: var(--primary-background); }

        p { opacity: 1; }
      }
    }

    h3 {
      color: var(--main);
      font-size:var(--font__titleStack);
      font-style: normal;
      line-height: 5.625rem;
      letter-spacing: 0.24rem;
      transition: color 0.3s ease-out;
    }

    p {
      color: var(--paragraph);
      font-size: var(--font__title);
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.015rem;
      margin-bottom: 1.5rem;

      @media screen and (min-width: 640px) { width: min(18.25rem, 100%); }

      @media screen and (min-width: 768px) { margin-bottom: 0; }

      @media screen and (hover: hover) {
        color: var(--primary-background);
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    }

    .line {
      display: inline;
      height: 0.0625rem;
      align-self: stretch;
      background: var(--secondary-background);
    }

    .background {
      display: none;

      @media screen and (hover: hover) {
        display: block;
        position: absolute;
        inset: 0;
        z-index: -1;
        background-color: var(--highlight);
        height: 0;
        transition: height 0.5s ease-out;
      }
    }
  }
`;

export default function Stack({ data }) {
  const listRef = useRef(null)

  useEffect(() => {
    const lines = listRef.current.querySelectorAll('.line')

    lines.forEach((line) => {
      gsap.set(line, { width: 0 })
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top bottom',
          end: 'bottom 70%',
          scrub: 3,
        },
        width: '100%',
      })
    })
  }, [])

  return (
    <Section id='about'>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-5 xl:col-start-5 xl:col-end-10'>
          <SmallTitle title={data.title} />
        </div>
      </div>
      <List ref={listRef}>
        {data.items.map((item, index) => {
          return (
            <li key={item.id} className='flareBigger'>
              <div className='background'></div>
              {index === 0 ? (
                <>
                  <span className='line'></span>
                  <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
                    <div className='col-start-2 col-end-12 xl:col-start-5 xl:col-end-21 flex flex-col sm:flex-row sm:items-center justify-between gap-x-2.5'>
                      <h3 className={`${anton.className}`}>{item.key}</h3>
                      <p className={`${nunitoSans.className}`}>{item.value}</p>
                    </div>
                  </div>
                  <span className='line'></span>
                </>
              ) : (
                <>
                  <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
                    <div className='col-start-2 col-end-12 xl:col-start-5 xl:col-end-21 flex flex-col sm:flex-row sm:items-center justify-between gap-x-2.5'>
                      <h3 className={`${anton.className}`}>{item.key}</h3>
                      <p className={`${nunitoSans.className}`}>{item.value}</p>
                    </div>
                  </div>
                  <span className='line'></span>
                </>
              )}
            </li>
          )
        })}
      </List>
    </Section>
  )
}
