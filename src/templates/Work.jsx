import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton, Maitree } from 'next/font/google'
import Link from 'next/link'
import ContentfulImage from '@/components/ContentfulImage'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import gsap from 'gsap'
import SmallTitle from '@/components/SmallTitle'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const maitree = Maitree({
  weight: ['300'],
  subsets: ['latin'],
})

const Section = styled.section`
  padding: 6.25rem 0rem;
`

const List = styled.ul`
  margin-top: 1.25rem;

  .tech {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 1.875rem 0.9375rem;

    @media screen and (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &__img {
      display: none;

      @media screen and (hover: hover) {
        display: block;
        position: absolute;
        inset: 0;
        z-index: 3;
        overflow: hidden;
        pointer-events: none;

        &--reveal {
          visibility: hidden;
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;

          &:before {
            content: '';
            position: absolute;
            z-index: 1;
            inset: 0;
            background: linear-gradient(
              0deg,
              rgba(22, 22, 26, 0.75) 0%,
              rgba(22, 22, 26, 0.75) 100%
            );
          }

          img {
            position: relative;
            height: 100%;
            width: 100%;
            object-fit: cover;
            transform-origin: top;
          }
        }
      }
    }

    h3 {
      color: var(--main);
      font-size: 1.5rem;
      letter-spacing: 0.06rem;
    }

    p {
      color: var(--highlight);
      font-size: 0.75rem;
      letter-spacing: 0.075rem;
    }

    h3,
    p {
      @media screen and (hover: hover) {
        position: relative;
        z-index: 3;
        color: var(--paragraph);
        transition: color 0.5s ease-out;
      }
    }
  }

  .line {
    width: 100%;
    height: 0.0625rem;
    background-color: var(--secondary-background);
  }
`

export default function Work({ data, items }) {
  const listRef = useRef(null)
  const charsRefs = useRef([])

  useEffect(() => {
    if (listRef && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()

        const li = listRef.current.querySelectorAll('li')
        const lines = listRef.current.querySelectorAll('.line')

        li.forEach((item) => {
          const chars = item.querySelectorAll('.char')
          const text = item.querySelector('p')
          const reveal = item.querySelector('.tech__img--reveal')
          const image = reveal.querySelector('img')
          const tl = gsap.timeline({ paused: true })

          charsRefs.current.push(chars)

          item.addEventListener('mouseenter', () => {
            tl.clear()
            tl.set(reveal, { autoAlpha: 1 })
            tl.fromTo(
              chars,
              {
                color: 'var(--paragraph)',
              },
              {
                color: 'var(--main)',
                stagger: 0.03,
                ease: 'linear',
              }
            )
            tl.fromTo(
              reveal,
              {
                yPercent: -100,
              },
              {
                yPercent: 0,
                duration: 1.5,
                ease: 'power4.out',
              },
              0
            )
            tl.fromTo(
              image,
              {
                yPercent: 100,
                scale: 1.3,
              },
              {
                yPercent: 0,
                scale: 1,
                duration: 1.5,
                delay: -1.5,
                ease: 'power4.out',
              },
            )
            tl.fromTo(
              text,
              {
                color: 'var(--paragraph)',
              },
              {
                color: 'var(--highlight)',
                ease: 'sine.out',
              },
              0.5
            )
            tl.play()
          })

          item.addEventListener('mouseleave', () => {
            tl.reverse()
          })
        })

        lines.forEach((line) => {
          gsap.set(line, { width: 0 })
          gsap.to(line, {
            scrollTrigger: {
              trigger: line,
              start: 'top bottom',
              end: 'bottom 80%',
              scrub: 2,
            },
            width: '100%',
          })
        })
      })
    }
  }, [])

  return (
    <Section id='skills'>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-5 xl:col-start-5 xl:col-end-10'>
          <SmallTitle title={data.title} />
        </div>
      </div>
      <List
        ref={listRef}
        className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'
      >
        {items.map((item, i) => {
          const fields = item.fields
          const image = fields.image.fields

          return (
            <li
              key={i}
              className='col-start-2 col-end-12 xl:col-start-5 xl:col-end-21 z-20'
            >
              <Link
                aria-label={fields.title}
                target='_blank'
                href={fields.link}
              >
                <div className='tech'>
                  <div className='tech__img'>
                    <div className='tech__img--reveal'>
                      <ContentfulImage
                        src={image.file.url}
                        width={image.file.details.image.width}
                        height={image.file.details.image.height}
                        quality='100'
                        alt={image.title}
                      />
                    </div>
                  </div>
                  <h3 data-splitting='chars' className={`${maitree.className}`}>
                    {fields.title}
                  </h3>
                  <p className={`${anton.className}`}>{fields.stack}</p>
                </div>
              </Link>
              <div className='line'></div>
            </li>
          )
        })}
      </List>
    </Section>
  )
}
