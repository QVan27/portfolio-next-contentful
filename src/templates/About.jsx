import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Nunito_Sans } from 'next/font/google'
import Texture from '@/assets/images/distortions/texture.jpeg'
import hoverEffect from 'hover-effect'
import RichText from '@/components/RichText'
import SmallTitle from '@/components/SmallTitle'
import gsap from 'gsap'

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin'],
})

const Section = styled.section`
  position: relative;
  overflow: hidden;

  .distortion {
    position: absolute;
    z-index: calc(var(--z-networks) + 1);
    inset: 0;
    overflow: hidden;
    mix-blend-mode: color-dodge;

    @media screen and (min-width: 1024px) { mix-blend-mode: lighten; }

    div {
      margin-inline: auto;
      width: min(37.125rem, 100%);
      height: 100%;
      filter: saturate(0);

      @media screen and (hover: hover) {
        transition: filter 0.5s ease-out;

        &:hover { filter: saturate(1); }
      }

      canvas { pointer-events: none; }
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
  const distortion = useRef(null)
  const imageDistortion1 = data.image.fields.file.url
  const imageDistortion2 = data.image.fields.file.url

  useEffect(() => {
    new hoverEffect({
      parent: distortion.current,
      intensity: 0.2,
      image1: imageDistortion1,
      image2: imageDistortion2,
      displacementImage: Texture.src,
      imagesRatio: 1 / 0.8,
      easing: 'power4.out',
    })
  }, [])

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
          <div className='distortion'>
            <div className='flareBigger' ref={distortion}></div>
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
