import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton, Maitree } from 'next/font/google'
import Link from 'next/link'
import ContentfulImage from '@/components/ContentfulImage'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import gsap from 'gsap'

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
    overflow: hidden;

    @media screen and (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    @media screen and (hover: hover) {
      &:before {
        content: '';
        position: absolute;
        z-index: 2;
        inset: 0;
        background: linear-gradient(
          0deg,
          rgba(22, 22, 26, 0.75) 0%,
          rgba(22, 22, 26, 0.75) 100%
        );
      }

      &:hover {
        img { opacity: 1; }

        p { color: var(--highlight); }
      }
    }

    img {
      display: none;

      @media screen and (hover: hover) {
        display: block;
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.5s ease-out;
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
  const charsRefs = useRef([]);

  useEffect(() => {
    if (listRef && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()

        const li = listRef.current.querySelectorAll('li')

        li.forEach((item) => {
          const chars = item.querySelectorAll('.char')

          charsRefs.current.push(chars)

          item.addEventListener('mouseenter', () => {
            gsap.to(chars, {
              duration: 0.5,
              color: 'var(--main)',
              stagger: 0.04,
              ease: 'power4.inOut',
            })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(chars, {
              duration: 0.5,
              color: 'var(--paragraph)',
              stagger: 0.04,
              ease: 'power4.inOut',
            })
          })
        })
      })
    }
  }, [])

  return (
    <Container>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-5 xl:col-start-5 xl:col-end-10'>
          <h2 className={`${anton.className} small-title`}>{data.title}</h2>
        </div>
      </div>
      <List ref={listRef} className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
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
                <ContentfulImage
                  src={item.fields.image.fields.file.url}
                  width={item.fields.image.fields.file.details.image.width}
                  height={item.fields.image.fields.file.details.image.height}
                  quality='100'
                  alt={item.fields.image.title}
                />
                <h3 data-splitting='chars' className={`${maitree.className}`}>{item.fields.title}</h3>
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
