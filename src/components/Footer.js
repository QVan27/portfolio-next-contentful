import React, { useEffect, useRef } from 'react'
import styled from "styled-components"
import { Anton, Maitree, Nunito_Sans } from 'next/font/google'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import gsap from 'gsap'
import Link from "next/link"

const anton = Anton({
  weight: ["400"],
  subsets: ['latin']
})

const maitree = Maitree({
  weight: ["300"],
  subsets: ['latin']
})

const nunitoSans = Nunito_Sans({
  weight: ["300"],
  subsets: ['latin']
})

const Container = styled.footer`
  padding: 6.25rem 0rem 1.875rem 0rem;

  .title {
    color: var(--main);
    font-size: 0.75rem;
    line-height: normal;
    letter-spacing: 0.075rem;
  }

  .socials a {
    font-size: 2.25rem;
    letter-spacing: 0.09rem;
  }

  .email {
    color: var(--main);
    font-size: 0.875rem;
    line-height: normal;
    letter-spacing: 0.035rem;
  }
`;

export default function Footer() {
  const socials = useRef(null);
  const charsRefs = useRef([]);

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
              duration: 1,
              color: 'var(--main)',
              stagger: 0.05,
              ease: 'sine.out',
            })
          })

          link.addEventListener('mouseleave', () => {
            gsap.to(chars, {
              duration: 1,
              color: 'var(--paragraph)',
              stagger: 0.05,
              ease: 'sine.out',
            })
          })
        })
      })
    }
  }, [])

  return (
    <Container>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex flex-col gap-y-10'>
          <span className={`${anton.className} title uppercase`}>connect</span>
          <div className='flex flex-wrap justify-between items-end'>
            <div ref={socials} className={`${maitree.className} flex flex-col items-start socials`}>
              <Link data-splitting='chars' aria-label='LinkedIn' href='#'>LinkedIn</Link>
              <Link data-splitting='chars' aria-label='Github' href='#'>Github</Link>
            </div>
              <Link className={`${nunitoSans.className} email`} aria-label='qvannarathdev@gmail.com' href='mailto:qvannarathdev@gmail.com'>qvannarathdev@gmail.com</Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
