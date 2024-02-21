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
    color: rgba(255, 255, 254, 0.2);

    @media screen and (hover: hover) {
      color: rgba(255, 255, 254, 0.3);
      background: linear-gradient(to right, var(--main), var(--main)) no-repeat;
      -webkit-background-clip: text;
      background-clip: text;
      background-size: 0%;
      transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;

      &:hover {
        background-size: 100%;
      }
    }
  }

  .email {
    position: relative;
    overflow: hidden;
    margin-top: 1rem;
    font-size: 0.875rem;
    letter-spacing: 0.035rem;

    @media screen and (min-width: 640px) {
      margin-top: 0;
    }

    .show,
    .hide {
      display: block;
    }

    .hide {
      position: absolute;
      bottom: 0;
      color: var(--main);
    }
  }
`

export default function Footer({ data }) {
  const socials = useRef(null)
  const charsRefs = useRef([])

  const contact = useRef(null)
  const contactShow = useRef([])
  const contactHide = useRef([])

  useEffect(() => {
    if (socials && charsRefs.current.length === 0) {
      import('splitting').then(({ default: Splitting }) => {
        Splitting()
        const showChars = contact.current.querySelectorAll('.show .char')
        const hideChars = contact.current.querySelectorAll('.hide .char')

        contactShow.current.push(showChars)
        contactHide.current.push(hideChars)

        gsap.set(contactHide.current, { y: 5, rotateX: -90, opacity: 0 })

        const tl = gsap.timeline({ paused: true })

        contact.current.addEventListener('mouseover', () => {
          tl.to(contactShow.current, {
            y: -5,
            opacity: 0,
            rotateX: 90,
            stagger: 0.02,
            ease: 'sine.out',
          }).to(
            contactHide.current,
            {
              y: 0,
              rotateX: 0,
              opacity: 1,
              stagger: 0.02,
              ease: 'sine.out',
              onComplete: () => tl.pause()
            },
            '<0.1'
          )

          tl.play()
        })

        contact.current.addEventListener('mouseout', () => {
          tl.reverse()
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
                  aria-label={data.linkedinText}
                  href={data.linkedinLink}
                  target='_blank'
                >
                  {data.linkedinText}
                </Link>
                <Link
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
                <span data-splitting='chars' className='show'>
                  {data.email}
                </span>
                <span data-splitting='chars' className='hide'>
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
