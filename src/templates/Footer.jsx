import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Maitree, Nunito_Sans } from 'next/font/google'
import gsap from 'gsap'
import Link from 'next/link'
import SmallTitle from '@/components/SmallTitle'
import ScrollTopButton from '@/components/ScrollTopButton'

const maitree = Maitree({
  weight: ['300'],
  subsets: ['latin'],
})

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin'],
})

const Container = styled.footer`
  position: relative;
  z-index: calc(var(--z-networks) + 1);
  padding: 6.25rem 0rem 1.875rem 0rem;

  .socials a {
    font-size: 2.25rem;
    letter-spacing: 0.09rem;
    transition: all 0.3s ease-out;

    .char {
      transition: all 0.3 ease-out;
    }
  }

  .email {
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
    color: var(--main);
    font-size: 0.875rem;
    line-height: normal;
    letter-spacing: 0.035rem;

    @media screen and (min-width: 640px) {
      margin-top: 0;
    }

    @media screen and (hover: hover) {
      color: var(--paragraph);
    }

    span {
      &.hide {
        display: inline-flex;
        position: absolute;
        inset: 0;
      }

      &.word {
        display: inline-flex;
        align-items: center;
      }
    }
  }
`

export default function Footer({ data }) {
  const socials = useRef(null)
  const charsRefs = useRef([])

  const contact = useRef(null)
  const contactWordRef = useRef([])
  const contactWordHideRef = useRef([])

  useEffect(() => {
    if (socials && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()

        const links = socials.current.querySelectorAll('a')

        links.forEach((link) => {
          const chars = link.querySelectorAll('.char')

          charsRefs.current.push(chars)

          link.addEventListener('mouseenter', () => {
            gsap.to(chars, {
              color: 'var(--main)',
              stagger: 0.03,
              duration: 0.7,
            })
            gsap.to(
              link,
              {
                translateX: '10px',
                duration: 1,
              },
              0
            )
          })

          link.addEventListener('mouseleave', () => {
            gsap.to(chars, {
              color: 'var(--paragraph)',
              stagger: 0.03,
              duration: 0.7,
            })
            gsap.to(
              link,
              {
                translateX: 0,
                duration: 1,
              },
              0
            )
          })
        })

        const word = contact.current.querySelectorAll('.show .word')
        const wordHide = contact.current.querySelectorAll('.hide .word')

        contactWordRef.current.push(word)
        contactWordHideRef.current.push(wordHide)

        gsap.set(wordHide, { yPercent: 100, opacity: 0 })

        contact.current.addEventListener('mouseenter', () => {
          gsap.to(word, {
            duration: 0.5,
            yPercent: -100,
            opacity: 0,
            ease: 'power4.out',
          })

          gsap.to(wordHide, {
            duration: 0.5,
            color: 'var(--main)',
            yPercent: 0,
            opacity: 1,
            ease: 'power4.out',
          })
        })

        contact.current.addEventListener('mouseleave', () => {
          gsap.to(word, {
            duration: 0.5,
            yPercent: 0,
            opacity: 1,
            ease: 'power4.out',
          })

          gsap.to(wordHide, {
            duration: 0.5,
            yPercent: 100,
            color: 'var(--paragraph)',
            opacity: 0,
            ease: 'power4.out',
          })
        })
      })
    }
  }, [])

  return (
    <>
      <ScrollTopButton />
      <Container>
        <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
          <div className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex flex-col gap-y-10'>
            <SmallTitle title={data.title} />
            <div className='flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-end'>
              <div
                ref={socials}
                className={`${maitree.className} flex flex-col items-start socials`}
              >
                <Link
                  data-splitting='chars'
                  aria-label={data.linkedinText}
                  href={data.linkedinLink}
                  target='_blank'
                >
                  {data.linkedinText}
                </Link>
                <Link
                  data-splitting='chars'
                  aria-label={data.githubText}
                  href={data.githubLink}
                  target='_blank'
                >
                  {data.githubText}
                </Link>
              </div>
              <Link
                ref={contact}
                className={`${nunitoSans.className} email`}
                aria-label={data.email}
                href={`mailto:${data.email}`}
              >
                <span className='show' data-splitting='chars'>
                  {data.email}
                </span>
                <span className='hide' data-splitting='chars'>
                  {data.email}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
