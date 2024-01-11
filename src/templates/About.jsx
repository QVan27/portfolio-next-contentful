import React, { useRef, useEffect } from 'react'
import { Nunito_Sans } from 'next/font/google'
import gsap from 'gsap'
import styled from 'styled-components'
import RichText from '@/components/RichText'
import SmallTitle from '@/components/SmallTitle'
import ImageAberration from '@/components/ImageAberration'

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin'],
})

const Section = styled.section`
  position: relative;
  overflow: hidden;

  .aberration-container {
    display: none;

    @media screen and (min-width: 1024px) {
      display: block;
      position: absolute;
      z-index: calc(var(--z-networks) + 1);
      inset: 0;
      overflow: hidden;
      mix-blend-mode: lighten;
    }
  }

  .content {
    margin: 9.375rem 0 6.25rem 0rem;

    &__text {
      color: var(--paragraph);
      font-size: var(--font__text);
      line-height: normal;
      letter-spacing: 0.03rem;
    }
  }
`

export default function About({ data }) {
  const richTextRef = useRef(null)

  useEffect(() => {
    const paragraphs = richTextRef.current.querySelectorAll('p')

    paragraphs.forEach((p) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: p,
          start: 'top bottom',
          end: 'bottom 80%',
          scrub: 1,
        },
      })

      tl.fromTo(
        p,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }
      )
    })
  }, [])

  return (
    <Section>
      <div className='grid grid-cols-12 lg:grid-cols-24 gap-x-2.5 items-center'>
        <div className='col-start-2 col-end-12 lg:col-start-3 lg:col-end-11 h-full lg:relative'>
          <div className='aberration-container'>
            <ImageAberration imgSrc={data.image.fields.file.url} id={'about'} />
          </div>
        </div>
        <div className='content col-start-2 col-end-12 lg:col-start-12 lg:col-end-23 flex flex-col gap-y-5'>
          <SmallTitle title={data.title} />
          <div
            ref={richTextRef}
            className={`${nunitoSans.className} content__text`}
          >
            <RichText content={data.text} />
          </div>
        </div>
      </div>
    </Section>
  )
}
