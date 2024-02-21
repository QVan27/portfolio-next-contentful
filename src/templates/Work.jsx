import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Anton, Nunito_Sans } from 'next/font/google'
import Link from 'next/link'
import gsap from 'gsap'
import SmallTitle from '@/components/SmallTitle'
import ImageAberration from '@/components/ImageAberration'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin'],
})

const nunito_sans = Nunito_Sans({
  weight: ['400'],
  subsets: ['latin'],
})

const Section = styled.section`
  padding: 6.25rem 0rem;
  overflow: hidden;
`

const List = styled.ul`
  margin-top: 1.25rem;

  .tech {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 1.875rem 0;

    @media screen and (min-width: 1024px) {
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    &__img {
      display: block;
      border-radius: 0.5rem;
      margin-bottom: 1.875rem;
      overflow: hidden;
      border: 1px solid var(--paragraph);
      height: 10.5rem;

      @media screen and (min-width: 768px) {
        width: 100%;
        height: 21rem;
      }

      @media screen and (min-width: 1024px) {
        width: 100%;
        height: 28.5rem;
      }

      @media screen and (min-width: 1280px) {
        height: 26vw;
      }
    }

    &__head {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      &-title {
        display: inline-flex;
        gap: 0.5rem;
        align-items: flex-end;

        h3 {
          color: rgba(255, 255, 254, 0.2);
          font-size: var(--font__titleWork);
          line-height: var(--font__titleWork);
          letter-spacing: 0.075rem;
          text-transform: uppercase;
          background: linear-gradient(to right, var(--main), var(--main))
            no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 0%;
          transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;

          @media screen and (hover: hover) {
            position: relative;
            z-index: 3;
          }
        }

        a {
          letter-spacing: 0.075rem;
          margin-bottom: -0.2rem;
          white-space: nowrap;
          font-size: calc(10px + (12 - 10) * ((100vw - 320px) / (1440 - 320)));
          text-transform: uppercase;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1.25rem;

      @media screen and (min-width: 1024px) {
        margin-top: 0;
        width: 20rem;
      }

      span {
        color: var(--main);
        font-size: var(--font__title);
        letter-spacing: 0.075rem;
        text-transform: uppercase;
      }

      p {
        color: var(--paragraph);
        font-size: 0.75rem;
        letter-spacing: 0.075rem;

        @media screen and (hover: hover) {
          position: relative;
          z-index: 3;
          color: var(--paragraph);
          transition: color 0.5s ease-out;
        }
      }
    }

    a {
      color: var(--highlight);

      @media screen and (hover: hover) {
        color: rgba(255, 99, 0, 0.8);
        background: linear-gradient(
            to right,
            var(--highlight),
            var(--highlight)
          )
          no-repeat;
        -webkit-background-clip: text;
        background-clip: text;
        background-size: 0%;
        transition: background-size cubic-bezier(0.1, 0.5, 0.5, 1) 0.5s;

        &:hover {
          background-size: 100%;
        }
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
  const liRef = useRef(null)

  useEffect(() => {
    const li = liRef.current.querySelectorAll('li')

    li.forEach((item) => {
      const title = item.querySelector('h3')
      const line = item.querySelector('.line')

      gsap.set(line, { width: 0 })
      gsap.to(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 2,
        },
        width: '100%',
      })

      gsap.to(title, {
        backgroundSize: '100%',
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom 85%',
          scrub: true,
        },
      })

      const direction = item.classList.contains('right') ? 100 : -100

      gsap.set(item, {
        x: direction,
        opacity: 0,
      })

      gsap.to(item, {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom 90%',
          scrub: 1,
        },
      })
    })
  }, [])

  return (
    <Section id='projects'>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5'>
        <div className='col-start-2 col-end-5 xl:col-start-5 xl:col-end-10'>
          <SmallTitle title={data.title} />
        </div>
      </div>
      <List
        ref={liRef}
        className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5 xl:gap-16'
      >
        {items.map((item, i) => {
          const fields = item.fields
          const image = fields.image.fields

          return (
            <li
              key={i}
              className={`col-start-2 col-end-12 ${
                i % 2 !== 0
                  ? 'xl:col-start-9 xl:col-end-21 right'
                  : 'xl:col-start-5 xl:col-end-17 left'
              } z-20`}
            >
              <div>
                <div className='tech'>
                  <div className='tech__img'>
                    <ImageAberration
                      imgSrc={image.file.url}
                      id={`work-${i}`}
                      cover
                    />
                  </div>
                  <div className='tech__head'>
                    <div className='tech__head-title'>
                      <h3 className={`${anton.className}`}>{fields.title}</h3>
                      <Link
                        aria-label={fields.title}
                        target='_blank'
                        rel='noopener noreferrer'
                        href={fields.link}
                        className={`${nunito_sans.className} seeMore`}
                      >
                        see more
                      </Link>
                    </div>
                    {fields.digitalCover && (
                      <span className={`${nunito_sans.className}`}>
                        made with{' '}
                        <Link
                          href='https://digital-cover.fr/'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Digital Cover
                        </Link>
                      </span>
                    )}
                  </div>
                  <div className='tech__content'>
                    <span className={`${anton.className}`}>Technologies :</span>
                    <p className={`${nunito_sans.className}`}>{fields.stack}</p>
                  </div>
                </div>
              </div>
              <div className='line'></div>
            </li>
          )
        })}
      </List>
    </Section>
  )
}
