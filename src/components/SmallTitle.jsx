import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton } from 'next/font/google'
import gsap from 'gsap'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const TitleH2 = styled.h2`
  color: var(--main);
  font-size: var(--font__title);
  line-height: normal;
  letter-spacing: 0.075rem;
  text-transform: uppercase;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
`

export default function SmallTitle({ title }) {
  const charsTitleRefs = useRef(null)

  useEffect(() => {
    import('splitting').then(({ default: Splitting }) => {
      Splitting()

      const animateTitle = () => {
        if (charsTitleRefs.current) {
          const chars = charsTitleRefs.current.querySelectorAll('.char')

          gsap.fromTo(
            chars,
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
                start: 'top bottom',
                end: 'top 90%',
                scrub: 3,
              },
            }
          )
        }
      }

      animateTitle()
    })
  }, [])

  return (
    <TitleH2
      data-splitting='chars'
      className={`${anton.className}`}
      ref={charsTitleRefs}
    >
      {title}
    </TitleH2>
  )
}
