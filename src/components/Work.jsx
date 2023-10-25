import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton, Maitree } from 'next/font/google'
import Link from 'next/link'
import ContentfulImage from '@/components/ContentfulImage'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const maitree = Maitree({
  weight: ['300'],
  subsets: ['latin'],
})

const Container = styled.section`
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
            transform-origin: left;
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
  const containerRef = useRef(null)
  const charsRefs = useRef([])
  const charsTitleRefs = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (listRef && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()

        const li = listRef.current.querySelectorAll('li')
        const lines = listRef.current.querySelectorAll('.line')
        const chars = containerRef.current.querySelectorAll('h2 .char')

        charsTitleRefs.current.push(chars)

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
              item,
              {
                zIndex: 0,
              },
              {
                zIndex: 100,
              }
            )
            tl.fromTo(
              chars,
              {
                color: 'var(--paragraph)',
              },
              {
                color: 'var(--main)',
                duration: 0.3,
                stagger: 0.03,
                ease: 'power4.out',
              }
            )
            tl.fromTo(
              reveal,
              {
                xPercent: -100,
              },
              {
                xPercent: 0,
                duration: 1.5,
                ease: 'power4.out',
              },
              0.3
            )
            tl.fromTo(
              image,
              {
                xPercent: 100,
                scale: 1.3,
              },
              {
                xPercent: 0,
                scale: 1,
                duration: 1.5,
                delay: -1.5,
                ease: 'power4.out',
              }
            )
            tl.fromTo(
              text,
              {
                color: 'var(--paragraph)',
              },
              {
                color: 'var(--highlight)',
                duration: 0.3,
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
              end: 'bottom 70%',
              scrub: true,
            },
            width: '100%',
          })
        })

        gsap.fromTo(
          charsTitleRefs.current,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: charsTitleRefs.current,
              start: 'top 80%',
              end: 'top center',
              scrub: true,
            },
          }
        )
      })
    }
  }, [])

  return (
    <Container ref={containerRef}>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-5 xl:col-start-5 xl:col-end-10'>
          <h2
            data-splitting='chars'
            className={`${anton.className} small-title`}
          >
            {data.title}
          </h2>
        </div>
      </div>
      <List
        ref={listRef}
        className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'
      >
        {items.map((item, i) => (
          <li
            key={i}
            className='col-start-2 col-end-12 xl:col-start-5 xl:col-end-21'
          >
            <Link
              aria-label={item.fields.title}
              target='_blank'
              href={item.fields.link}
            >
              <div className='tech'>
                <div className='tech__img'>
                  <div className='tech__img--reveal'>
                    <ContentfulImage
                      src={item.fields.image.fields.file.url}
                      width={item.fields.image.fields.file.details.image.width}
                      height={
                        item.fields.image.fields.file.details.image.height
                      }
                      quality='100'
                      alt={item.fields.image.title}
                    />
                  </div>
                </div>
                <h3 data-splitting='chars' className={`${maitree.className}`}>
                  {item.fields.title}
                </h3>
                <p className={`${anton.className}`}>{item.fields.stack}</p>
              </div>
            </Link>
            <div className='line'></div>
          </li>
        ))}
      </List>
    </Container>
  )
}