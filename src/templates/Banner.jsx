import React, { useRef, useEffect } from 'react'
import { Anton, Maitree } from 'next/font/google'
import gsap from 'gsap'
import styled from 'styled-components'
import RichText from '@/components/RichText'
import ImageAberration from '@/components/ImageAberration'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const maitree = Maitree({
  weight: ['200'],
  subsets: ['latin'],
})

const Section = styled.section`
  position: relative;

  .word {
    display: inline-flex;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  .aberration-container {
    display: block;
    position: absolute;
    z-index: calc(var(--z-networks) - 1);
    inset: 0;
    overflow: hidden;
    mix-blend-mode: color-dodge;

    div {
      margin-inline: auto;
      width: min(37.125rem, 100%);
      height: 100%;
    }
  }

  .content {
    position: relative;
    z-index: 2;
    line-height: normal;
    
    span,
    p {
      pointer-events: none;
    }

    .title-full {
      color: var(--highlight);
      font-size: var(--font__titleBorder);
      letter-spacing: 0.32rem;
      line-height: 1;
    }
  }

  .texts {
    div {
      width: min(46.31rem, 100%);

      @media screen and (min-width: 1280px) {
        width: min(50.31rem, 100%);
      }

      @media screen and (min-width: 1536px) {
        width: min(55.31rem, 100%);
      }

      div {
        pointer-events: none;
      }

      p {
        font-size: 2rem;
        font-style: normal;
        line-height: normal;

        @media screen and (min-width: 640px) {
          font-size: 2.5rem;
          text-align: center;
        }

        @media screen and (min-width: 1024px) {
          font-size: 2rem;
          text-align: right;
        }

        @media screen and (min-width: 1280px) {
          font-size: 2.5rem;
        }

        b {
          color: var(--highlight);
        }
      }
    }
  }
`

export default function Banner({ data }) {
  const aberrationRef = useRef(null)
  const titleRef = useRef(null)
  const firstBigTextRef = useRef(null)
  const secondBigTextRef = useRef(null)
  const thirdBigTextRef = useRef(null)
  const richTextRef = useRef(null)

  useEffect(() => {
    import('splitting').then(({ default: Splitting }) => {
      Splitting()

      const mm = gsap.matchMedia()
      const mediaQueries = [
        { minWidth: 320 },
        { minWidth: 640 },
        { minWidth: 1024 },
      ]

      mediaQueries.forEach(({ minWidth }) => {
        mm.add(`(min-width: ${minWidth}px)`, () => {
          if (minWidth === 320) {
            const tl = gsap.timeline()
            const charsRichText = richTextRef.current.querySelectorAll('.char')
            gsap.set(charsRichText, { opacity: 0 })
            gsap.set(aberrationRef.current, { opacity: 0 })

            tl.to(
              charsRichText,
              {
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'power4.out',
              },
              3
            ).to(
              aberrationRef.current,
              {
                opacity: 1,
                ease: 'sine.inOut',
                duration: 1,
              },
              '-=1'
            )
          }

          if (minWidth === 640) {
            const tl = gsap.timeline()
            const charsRichText = richTextRef.current.querySelectorAll('.char')
            const charsFirstBigText =
              firstBigTextRef.current.querySelectorAll('.char')
            const charsSecondBigText =
              secondBigTextRef.current.querySelectorAll('.char')

            gsap.set(charsRichText, { opacity: 0 })
            gsap.set(aberrationRef.current, { opacity: 0 })
            gsap.set([charsFirstBigText, charsSecondBigText], {
              y: 100,
              opacity: 0,
            })

            tl.to(
              charsRichText,
              {
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'power4.out',
              },
              3
            )
              .to(
                aberrationRef.current,
                {
                  opacity: 1,
                  ease: 'sine.inOut',
                  duration: 1,
                },
                '-=1'
              )
              .to(
                charsFirstBigText,

                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.05,
                  duration: 2,
                  ease: 'power4.out',
                },
                '-=0.5'
              )
              .to(
                charsSecondBigText,
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.05,
                  duration: 2,
                  ease: 'power4.out',
                },
                '-=1.5'
              )
          }

          if (minWidth === 1024) {
            const tl = gsap.timeline()
            const charsRichText = richTextRef.current.querySelectorAll('.char')
            const charsFirstBigText =
              firstBigTextRef.current.querySelectorAll('.char')
            const charsSecondBigText =
              secondBigTextRef.current.querySelectorAll('.char')
            const charsThirdBigText =
              thirdBigTextRef.current.querySelectorAll('.char')

            gsap.set(charsRichText, { opacity: 0 })
            gsap.set(aberrationRef.current, { opacity: 0 })
            gsap.set(
              [charsFirstBigText, charsSecondBigText, charsThirdBigText],
              {
                y: 100,
                opacity: 0,
              }
            )

            tl.to(
              charsRichText,
              {
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'power4.out',
              },
              3
            )
              .to(
                aberrationRef.current,
                {
                  opacity: 1,
                  ease: 'sine.inOut',
                  duration: 1,
                },
                '-=1'
              )
              .to(
                charsFirstBigText,
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.05,
                  duration: 2,
                  ease: 'power4.out',
                },
                '-=0.5'
              )
              .to(
                charsSecondBigText,
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.05,
                  duration: 2,
                  ease: 'power4.out',
                },
                '-=1.5'
              )
              .to(
                charsThirdBigText,
                {
                  y: 0,
                  opacity: 1,
                  stagger: 0.05,
                  duration: 2,
                  ease: 'power4.out',
                },
                '-=1.5'
              )
          }
        })
      })
    })
  }, [])

  return (
    <Section>
      <div className='aberration-container' ref={aberrationRef}>
        <ImageAberration imgSrc={data.imagesDistortions[0].fields.file.url} id={'banner'} />
      </div>
      <div className='min-h-screen grid grid-cols-12 xl:grid-cols-24 gap-x-2.5 items-center'>
        <h1
          ref={titleRef}
          className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex flex-col items-center flareBigger content'
        >
          <span
            data-splitting='chars'
            ref={firstBigTextRef}
            className={`${anton.className} flareBigger hidden sm:block text-center title-border`}
          >
            {data.firstBigText}
          </span>
          <div className='flex flex-col lg:flex-row justify-center lg:gap-x-12 texts flareBigger items-center'>
            <div
              ref={richTextRef}
              data-splitting='chars'
              className={`${maitree.className} flareBigger`}
            >
              <RichText content={data.contents} />
            </div>
            <span
              data-splitting='chars'
              ref={secondBigTextRef}
              className={`${anton.className} flareBigger hidden sm:block title-full text-center`}
            >
              {data.secondBigText}
            </span>
          </div>
          <span
            data-splitting='chars'
            ref={thirdBigTextRef}
            className={`${anton.className} flareBigger hidden lg:block text-center title-border`}
          >
            {data.thirdBigText}
          </span>
        </h1>
      </div>
    </Section>
  )
}
